/* ── /agent-vps — follow-along runbook ────────────────────────────────
   Built as a console rather than an article: you keep it open on one
   screen and work on the other, the same way /app-review is used.

   Everything re-verified 7 Aug 2026 against code.claude.com and against
   anthropics/claude-code#55520, which is still open. Two findings changed
   the plan this started from:

   1. Anthropic now hosts the two things most people build a VPS for
      (Claude Code on the web, Routines), so step 0 is a gate that tries
      to end the project.
   2. The AVX problem is really a hypervisor CPU-model problem, and the
      fix is one setting rather than a workaround.

   Time-sensitive by nature. VERIFIED_ON is load-bearing and the last step
   is a prompt that re-checks the whole thing. */

export const VERIFIED_ON = "7 August 2026";

export const LEDE =
  "Claude Code on a server, working while you sleep, reachable from your phone. Most guides for this are wrong in the same two ways: they send you to a VPS you may not need, and they hand you an npm workaround that stopped working in January.";

export const TIME_TOTAL = "30–60 min for a working box · 2–4 hrs with real isolation";

export interface Block {
  filename: string;
  body: string;
}

export interface Step {
  id: string;
  n: string;
  title: string;
  /** One line, shown under the title. Why this step exists at all. */
  why: string;
  time: string;
  /** Longer notes, shown above the checks. */
  notes?: string[];
  /** Callout rendered in energy — the thing that bites. */
  warn?: string;
  /** Callout rendered in blue — the shortcut or the fix. */
  tip?: string;
  checks: string[];
  blocks?: Block[];
}

export const STEPS: Step[] = [
  {
    id: "gate",
    n: "00",
    title: "Decide you actually need this",
    why: "Anthropic now runs the two things most people build a VPS for. This step exists to end the project if it should end.",
    time: "10 min",
    notes: [
      "**Claude Code on the web** runs every session in an isolated Anthropic-managed VM, with a network proxy enforcing a default allowlist and your GitHub token held outside the sandbox. Needs a Claude subscription, no infrastructure.",
      "**Routines** run Claude Code on a schedule, on an API call, or reacting to GitHub events, on Anthropic's infrastructure. This is the hosted version of the cron-in-tmux setup most VPS guides are really building.",
      "**Remote Control** continues a local session from your phone or browser. If the actual want was \"check on it from my phone\", that is this, and it needs no server.",
    ],
    warn:
      "Build the VPS only if you need your own environment, your own private network, or a long-lived box that is yours. If what you wanted was a scheduler or a phone client, two of those already exist and someone else maintains them.",
    checks: [
      "I read what Claude Code on the web and Routines actually do",
      "I can say in one sentence why a hosted option does not cover my case",
      "I accept I am now maintaining a server",
    ],
  },
  {
    id: "preflight",
    n: "01",
    title: "Preflight the CPU before you buy anything",
    why: "The most common way this dies on day one is a two-word error that sends you looking for the wrong fix.",
    time: "5 min",
    notes: [
      "Claude Code installs cleanly, then dies instantly with `Illegal instruction` or `CPU lacks AVX support`. It happens before any CLI work, so nothing useful is logged.",
      "The break is exact: **2.1.112 works, 2.1.113 does not.** In 2.1.113 the CLI stopped shipping bundled JavaScript and started spawning a per-platform native binary.",
      "**The requirement is AVX2, not AVX.** Confirmed on bare metal both sides: an Intel Ivy Bridge i7-3820QM has AVX1 and still crashes, as does an AMD Athlon II X4 645 on Linux. Grepping for `avx` and seeing it does not clear this.",
      "**The npm workaround is dead**, whatever the blog posts say. npm now installs the same native binary via a per-platform optional dependency — the official docs say so. Downgrading to 2.0.x does not rescue you either; those versions are no longer API-compatible.",
    ],
    tip:
      "In most cases this is not a CPU problem at all, it is a hypervisor CPU-model problem, and the error message is misleading. Providers that default the guest CPU to qemu64 or kvm64 hide every modern instruction from the VM. Set the CPU type to host passthrough, or at minimum x86-64-v2-AES, and it starts working.",
    checks: [
      "Ran the preflight on a trial box, or confirmed the CPU type with the provider first",
      "grep found avx2, not just avx — or I am on ARM64 where it does not apply",
      "The CPU model is not qemu64 or kvm64",
    ],
    blocks: [
      {
        filename: "preflight.sh",
        body: `#!/usr/bin/env bash
# Does this box actually run Claude Code 2.1.113+ ?

echo "— CPU as the guest sees it —"
lscpu | grep -E "Model name|Architecture|Hypervisor"

echo
echo "— the one that matters —"
if grep -qo 'avx2' /proc/cpuinfo; then
  echo "OK   avx2 present"
else
  echo "STOP no avx2."
  echo "     Almost always the hypervisor CPU model, not the hardware."
  echo "     Set the guest CPU type to 'host' (passthrough) or at"
  echo "     minimum 'x86-64-v2-AES'. qemu64 / kvm64 hide it."
  echo "     On ARM64 this check does not apply — ignore it."
fi

echo
echo "— floors from the official requirements —"
awk '/MemTotal/ {printf "RAM   %.1f GB (need 4+)\\n", $2/1024/1024}' /proc/meminfo
. /etc/os-release 2>/dev/null && echo "OS    $PRETTY_NAME"
echo "USER  $(whoami) $([ "$(id -u)" -eq 0 ] && echo '<-- root, fix in step 02')"`,
      },
    ],
  },
  {
    id: "box",
    n: "02",
    title: "Provision the box",
    why: "Five decisions. Only the first is interesting, and it is the one providers get wrong by default.",
    time: "10–20 min",
    notes: [
      "**CPU model** — host passthrough, or x86-64-v2-AES minimum. The single setting that decides whether any of this works.",
      "**RAM** — 4 GB is the documented floor, 8 GB is comfortable. Builds and test suites eat it, not Claude.",
      "**Arch** — x64 or ARM64 both supported. ARM has no AVX2 question to answer at all, which is the shortest path past step 01.",
      "**OS** — Ubuntu 22.04 or Debian 12. Documented floors are Ubuntu 20.04+, Debian 10+, Alpine 3.19+.",
      "**User** — a non-root user with sudo. Not optional: Claude Code refuses to start with `--dangerously-skip-permissions` as root, and a VPS hands you root by default.",
    ],
    checks: [
      "CPU type set to host or x86-64-v2-AES",
      "4 GB RAM or more",
      "Created a non-root user with sudo and can SSH in as them",
    ],
    blocks: [
      {
        filename: "non-root-user.sh",
        body: `# as root on the fresh box
adduser agent
usermod -aG sudo agent

# copy your key across so you can log in as them
rsync --archive --chown=agent:agent ~/.ssh /home/agent/

# from now on, everything happens as this user
su - agent
whoami   # agent, not root`,
      },
    ],
  },
  {
    id: "install",
    n: "03",
    title: "Install, and pin it",
    why: "Two methods worth using on a server. Neither is npm.",
    time: "5 min",
    notes: [
      "**Signed apt/dnf/apk repository** — the right default for a server you intend to keep. You verify a GPG fingerprint instead of piping a URL into bash on a box that runs unattended, and updates arrive through your normal upgrade path.",
      "**Native installer** — fastest, and the only method that takes a version argument. Auto-updates in the background, which you probably want to pin down on a server.",
      "On an unattended box a background auto-update is a change you did not make to a system nobody is watching. Pin the channel and set a floor, or turn the updater off and update on purpose.",
    ],
    checks: [
      "claude --version prints a version",
      "claude doctor runs clean",
      "Release channel and minimum version pinned in settings.json",
    ],
    blocks: [
      {
        filename: "install-apt.sh",
        body: `sudo apt install -y curl gnupg
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \\
  -o /etc/apt/keyrings/claude-code.asc

# STOP and compare. Expected fingerprint:
#   31DD DE24 DDFA B679 F42D  7BD2 BAA9 29FF 1A7E CACE
gpg --show-keys /etc/apt/keyrings/claude-code.asc

echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] \\
https://downloads.claude.ai/claude-code/apt/stable stable main" \\
  | sudo tee /etc/apt/sources.list.d/claude-code.list

sudo apt update && sudo apt install -y claude-code
claude --version
claude doctor`,
      },
      {
        filename: "install-native.sh  (alternative)",
        body: `# latest
curl -fsSL https://claude.ai/install.sh | bash

# stable channel — about a week behind, skips major regressions
curl -fsSL https://claude.ai/install.sh | bash -s stable

# an exact version
curl -fsSL https://claude.ai/install.sh | bash -s 2.1.89`,
      },
      {
        filename: "~/.claude/settings.json",
        body: `{
  "autoUpdatesChannel": "stable",
  "minimumVersion": "2.1.113",

  "env": {
    // uncomment to stop background updates entirely.
    // 'claude update' still works, so you update deliberately.
    // "DISABLE_AUTOUPDATER": "1"
  }
}`,
      },
    ],
  },
  {
    id: "alive",
    n: "04",
    title: "Survive the disconnect",
    why: "The whole point of a server is that closing your laptop changes nothing.",
    time: "2 min",
    notes: [
      "Without this, your SSH session ending kills the agent mid-task. tmux keeps the process running with nobody attached, and lets you reattach from a different device later.",
    ],
    checks: [
      "Started a named tmux session",
      "Detached, closed the terminal entirely, reconnected and found it still running",
    ],
    blocks: [
      {
        filename: "the three commands",
        body: `# start a named session
tmux new -s claude

# ... run claude inside it, then detach with:  Ctrl-b  then  d
# the agent keeps working with nobody connected

# come back later, from any device
tmux attach -t claude

# what's running right now
tmux ls`,
      },
    ],
  },
  {
    id: "reach",
    n: "05",
    title: "Reach it without opening a port",
    why: "Do not expose SSH to the internet for this. A private mesh means the box has no public attack surface at all.",
    time: "10 min",
    notes: [
      "Tailscale puts your laptop, phone and the VPS on one private network. Once it is up, close the public door with the firewall — the box becomes unreachable from the internet while staying reachable from your devices.",
      "Any SSH client works from there: Termius and Blink on a phone, plain ssh on a laptop.",
    ],
    checks: [
      "tailscale status shows the VPS and my laptop",
      "SSH works over the tailnet hostname",
      "ufw enabled and public SSH is closed — verified from outside the tailnet",
    ],
    blocks: [
      {
        filename: "tailscale.sh",
        body: `# on the VPS
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --ssh

# CHECK IT WORKS OVER TAILSCALE FIRST, then close the public door
sudo ufw default deny incoming
sudo ufw allow in on tailscale0
sudo ufw enable

# from your laptop or phone
#   ssh agent@<machine-name>
# machine name comes from 'tailscale status'`,
      },
    ],
  },
  {
    id: "boundary",
    n: "06",
    title: "Put a boundary around it",
    why: "Permission modes decide whether an action runs. Isolation decides what it can reach when it does. Unattended you need both, and the second is the one that saves you.",
    time: "30 min – 3 hrs",
    notes: [
      "The docs are unusually direct: **always run `--dangerously-skip-permissions` inside a container, a VM, or the sandbox runtime**, so file tools, MCP servers and hooks are inside the boundary too.",
      "**The built-in Bash sandbox is not enough on its own.** It restricts Bash commands and their children. Built-in file tools, MCP servers and hooks still run on the host.",
      "**Sandbox runtime** wraps the whole process in the same bubblewrap isolation, no Docker needed. Lightest thing that is actually sufficient. Beta research preview, so expect the config format to move.",
      "**Dev container** — the published example ships a default-deny iptables firewall, which is why it is the reference for unattended work.",
    ],
    tip:
      "The option most guides never mention: auto mode replaces the prompt with a classifier that blocks actions escalating beyond the request, targeting unrecognised infrastructure, or driven by hostile content Claude just read. It is a per-action control, not a boundary — but the docs are explicit that isolation is not required for it the way it is for the dangerous flag. If you reached for that flag out of habit, try this first.",
    checks: [
      "Picked one: sandbox runtime, dev container, or a VM",
      "Created ~/.claude and ~/.claude.json before first launch (Linux applies write grants only to paths that already exist)",
      "Passed --settings explicitly so a broken config fails loudly instead of starting with everything blocked",
      "Denied writes to shell startup files, ~/.ssh, ~/.aws and credential paths",
      "Confirmed I am not root",
    ],
    blocks: [
      {
        filename: "~/.srt-settings.json",
        body: `{
  "filesystem": {
    "allowWrite": [
      "~/projects/your-repo",
      "~/.claude",
      "~/.claude.json",
      "/tmp"
    ],
    "denyWrite": [
      "~/.bashrc", "~/.zshrc", "~/.profile",
      "~/.ssh", "~/.aws", "~/.config/gh"
    ]
  },
  "network": {
    "allow": [
      "api.anthropic.com",
      "claude.ai",
      "platform.claude.com",
      "github.com",
      "registry.npmjs.org"
    ]
  }
}`,
      },
      {
        filename: "launch.sh",
        body: `# Linux: write grants only apply to paths that ALREADY EXIST.
# Create these first or they are silently skipped.
mkdir -p ~/.claude && [ -f ~/.claude.json ] || echo '{}' > ~/.claude.json

# --settings makes a bad config FAIL. Without it the runtime starts
# anyway with network blocked and a tiny write set, and a clean start
# is not proof your config loaded.
npx @anthropic-ai/sandbox-runtime \\
  --settings ~/.srt-settings.json \\
  claude`,
      },
    ],
  },
  {
    id: "gotchas",
    n: "07",
    title: "The five that bite",
    why: "Everything above can be right and one of these still ruins your week.",
    time: "10 min",
    notes: [
      "**Run as non-root.** Claude Code refuses to start with the dangerous flag as root on Linux and macOS, and a VPS hands you root by default.",
      "**Deny writes to anything that survives a session.** The sandbox runtime already blocks `.git/hooks`, `.git/config`, `.mcp.json`, `.claude/commands`, `.claude/agents` and shell startup files — because a session that can write those can persist something that runs *unsandboxed* next launch.",
      "**Linux builds its deny list once at launch.** Anything the session creates later — a `git clone`, fresh scaffolding — is not covered. macOS checks at write time and does cover it.",
      "**A clean start is not proof your config loaded.** Without a valid settings file the runtime starts anyway with network blocked and a tiny write set.",
      "**Isolation does not change what is sent to the model.** Prompts and file contents still go to the API with or without a sandbox.",
    ],
    checks: [
      "Reviewed which paths I left writable",
      "On Linux, reviewed anything the session created after launch",
      "No credentials or .env files reachable inside the boundary",
    ],
  },
  {
    id: "reverify",
    n: "08",
    title: "Re-verify before you trust any of this",
    why: "This runbook has a shelf life. Do not trust the date, check it.",
    time: "5 min",
    notes: [
      "Issue #55520 was still open as of 5 August 2026, with sixteen comments and no response from Anthropic in the thread. The official system requirements page does not mention AVX or AVX2 at all, which is why so many people buy the wrong box. Both of those could change.",
    ],
    checks: ["Ran the prompt and reconciled anything that has moved"],
    blocks: [
      {
        filename: "paste into a fresh Claude Code session",
        body: `I'm about to set up Claude Code to run unattended on a cloud VPS.
Before I follow a runbook dated 7 Aug 2026, re-check these against
what's current today and tell me specifically what has changed:

1. Is anthropics/claude-code issue #55520 still open? Has a
   baseline / non-AVX2 build shipped? The runbook says the break is
   exactly 2.1.112 -> 2.1.113, that the real requirement is AVX2
   (not AVX1), and that the fix is usually the hypervisor CPU model
   (host or x86-64-v2-AES, not qemu64/kvm64). Still true?

2. Do the official system requirements now mention AVX/AVX2? They
   did not as of the date above.

3. Has the sandbox runtime (@anthropic-ai/sandbox-runtime) left beta,
   and has its config schema changed?

4. Has anything changed about --dangerously-skip-permissions, auto
   mode, or the rule that the dangerous flag refuses to run as root?

5. Do Claude Code on the web or Routines now cover the "run it on a
   schedule / check it from my phone" use case well enough that a
   self-hosted VPS is unnecessary for me?

Cite the official docs and the actual issue state rather than blog
posts — most third-party writeups still recommend an npm workaround
that stopped working in January 2026.`,
      },
    ],
  },
];

export const CLOSING =
  "The setup is not the hard part. The hard part is being honest about whether you need it, picking a CPU profile that exposes real instructions, and putting a boundary around the agent before you take the prompts away.";
