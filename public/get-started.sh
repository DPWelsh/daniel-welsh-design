#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Day Zero — the completely fresh computer
#  danielwelsh.design/get-started
#
#  Once, ever. This script does the install half.
#  Run it:  curl -fsSL https://danielwelsh.design/get-started.sh | bash
#
#  It is safe to run twice — everything checks before it installs.
# ─────────────────────────────────────────────────────────────
set -u

say()  { printf "\n\033[1m%s\033[0m\n" "$1"; }
note() { printf "  \033[2m%s\033[0m\n" "$1"; }
ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$1"; }

if [ "$(uname)" != "Darwin" ]; then
  warn "This script is written for Mac. On Windows: install Git (git-scm.com),"
  warn "Node (nodejs.org, LTS), Cursor (cursor.com), then: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

say "Day Zero — the install half."
note "Accounts come first and are on you: Chrome for the browser, then GitHub,"
note "Claude, Namecheap, and Vercel — signed up WITH the GitHub button."

# ── 1. Homebrew — the app store for builder tools ────────────
say "1/5 Homebrew"
if command -v brew >/dev/null 2>&1; then
  ok "already installed"
else
  note "installing — this may ask for your Mac password (that's normal, it's Apple's installer asking)"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Apple Silicon Macs need brew on the PATH for the rest of this script
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
  fi
  ok "installed"
fi

# ── 2. The engines — Git and Node ────────────────────────────
say "2/5 Git + Node"
for f in git node gh; do
  if command -v "$f" >/dev/null 2>&1; then
    ok "$f already installed"
  else
    brew install "$f" && ok "$f installed" || warn "$f failed — run: brew install $f"
  fi
done

# ── 3. The editor ────────────────────────────────────────────
say "3/5 Chrome + Cursor"
if [ -d "/Applications/Google Chrome.app" ]; then
  ok "Chrome already installed"
else
  brew install --cask google-chrome && ok "Chrome installed" || warn "Chrome failed — google.com/chrome"
fi
if [ -d "/Applications/Cursor.app" ]; then
  ok "Cursor already installed"
else
  brew install --cask cursor && ok "Cursor installed" || warn "Cursor failed — download from cursor.com"
fi

# ── 4. The builder ───────────────────────────────────────────
say "4/5 Claude Code"
if command -v claude >/dev/null 2>&1; then
  ok "already installed"
else
  npm install -g @anthropic-ai/claude-code && ok "installed" || warn "failed — run: npm install -g @anthropic-ai/claude-code"
fi

# ── 5. The day-zero skill — teaches Claude Code the first build ──
say "5/5 The day-zero skill"
mkdir -p "$HOME/.claude/skills/day-zero"
if curl -fsSL "https://danielwelsh.design/skills/day-zero/SKILL.md" -o "$HOME/.claude/skills/day-zero/SKILL.md"; then
  ok "installed to ~/.claude/skills/day-zero"
else
  warn "couldn't fetch the skill — download it from danielwelsh.design/get-started"
fi

# ── Done ─────────────────────────────────────────────────────
say "Machine ready. What's left is yours:"
note "1. Accounts (if not done): GitHub → Claude → Namecheap → Vercel (sign up WITH GitHub)"
note "2. Open Terminal, type:  claude   — and log in with your Claude account"
note "3. Tell Claude:  build my first site   — the skill takes it from there."
printf "\n"
note "That is Day Zero. danielwelsh.design/get-started"
