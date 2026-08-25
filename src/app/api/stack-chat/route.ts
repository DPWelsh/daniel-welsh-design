import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { isValidEmail, syncToBeehiiv } from "@/lib/email";
import { checkRateLimit, incrementRateLimit } from "@/lib/rate-limit";
import { SLOTS, CHALLENGES } from "@/app/saas-calc/stack-data";
import { MODES, priceIn, type Mode } from "@/app/saas-calc/build-modes";

/**
 * The advisor that stays. Stateless: the client sends the conversation and the
 * current board, the server sends back a reply and any changes.
 *
 * The model gets ONE tool, and that tool is the whole ask-versus-instruct
 * split made mechanical. Answering a question means replying in text. Changing
 * the board means calling update_stack. "Why Creem?" must not silently rewrite
 * a row, and this is what stops it.
 *
 * Every option id it returns is checked against the catalogue and dropped if
 * unknown, so it cannot recommend a tool nobody has priced. That property is
 * the reason this is safe to put in front of strangers.
 *
 * PROSE RULE: no em dashes anywhere.
 */

const MODEL = "claude-sonnet-5";
/* The interview itself is free, however long it takes, and so is the stack it
   produces. Asking for an email before someone has seen a filled board is
   charging for the questions. Two follow-ups after the fill are free too, then
   it asks. */
const FREE_AFTER_FILL = 2;
const MAX_TURNS = 12;
const MAX_CHARS = 600;

interface Turn {
  role: "user" | "assistant";
  content: string;
}

const catalogue = () =>
  SLOTS.map((s) => ({
    slot: s.id,
    job: s.label,
    options: s.options.map((o) => ({ id: o.id, name: o.name, plan: o.plan, usd: o.usd })),
  }));

const TOOL: Anthropic.Tool = {
  name: "update_stack",
  description:
    "Change the board. Call this ONLY when the person has told you to change something, or when you are filling the board for the first time after learning what they are building. Never call it merely because they asked a question about a row.",
  input_schema: {
    type: "object",
    properties: {
      set: {
        type: "object",
        description:
          "Slot id to option id. Use null as the value to clear a row. Only ids from the catalogue.",
        additionalProperties: { type: ["string", "null"] },
      },
      tier: { type: "string", description: "Budget tier id, if it should change." },
      mode: { type: "string", enum: ["quick", "scale", "self"], description: "Build type, if it should change." },
      currency: { type: "string", description: "Three letter currency code, if they asked for one." },
      note: {
        type: "string",
        description:
          "What you would have said out loud. Two or three sentences: the shape of this build, what will cost the most, and what you deliberately left out. Always fill this in, it is what the person reads.",
      },
    },
    required: ["set", "note"],
  },
};

const SYSTEM = `You are the stack advisor on danielwelsh.design. You help someone choose what to build their app on, and you have a board of job slots in front of you that you can fill.

HOW YOU BEHAVE
You run a short interview, ONE question per message, then you fill the board. Never ask two questions in one message. Never present a numbered list.

The order, and do not skip a step:
1. What the app does, if they have not already said. Also learn whether money changes hands and from where, and whether it handles uploads, phone calls or AI. That may take two questions. Stop as soon as you can make a decent call.
2. BUILD TYPE. Ask it plainly: are they early stage, building for 10,000 users, or self-hosting on their own boxes. Their answer sets mode on update_stack.
3. BUDGET. Ask what they want to spend a month. Their answer sets tier on update_stack.
4. Then fill the board with update_stack, including the mode and tier they told you.

Put your explanation in the tool's note field, because a turn that only calls the tool has no other text in it. Two or three sentences: the shape of this build, what will cost the most, what you left out on purpose.

After that, stay. They will argue with you. That is the point.

WHEN A QUESTION HAS A FIXED SET OF ANSWERS
End the message with a line in exactly this form, and nothing after it:
[[OPTIONS: Early stage | 10,000 users | Self-hosted]]
Use it for build type, for budget ([[OPTIONS: Under $25 | Under $100 | Under $1,000 | No limit]]), and for any yes or no. Do not use it for open questions like "what are you building". The options are buttons, so keep each one under about 20 characters.

ASKING VERSUS INSTRUCTING, THIS IS THE IMPORTANT PART
- "why Creem and not Stripe", "what happens at 10,000 users", "is Supabase overkill" are QUESTIONS. Answer them in text. Do NOT call update_stack.
- "use Stripe", "make it all free tiers", "I do not need voice", "show me self hosted" are INSTRUCTIONS. Call update_stack.
- If you are unsure which it is, answer in text and offer to make the change.

HOW YOU CHOOSE
- The cheapest option that actually does the job. Free tiers are real answers, not consolation prizes.
- Leaving a row empty is a stronger recommendation than filling it. An app with no uploads needs no file storage. Nobody needs a merchant of record before they have a customer.
- Payments: Stripe if they sell in their own country. A merchant of record (Paddle, Lemon Squeezy, Polar, Creem) if they sell internationally, because the MoR becomes the seller and files the sales tax.
- Never invent a tool. Only ids from the catalogue you were given.
- Prices on the board are US dollars a month, checked 16 Aug 2026.

HOW YOU WRITE
- Short. Two or three sentences unless they asked for detail.
- Specific to their app, never generic marketing.
- No em dashes. No bullet lists unless they asked for one.
- Disagree when they are wrong, and say why in one line. You are worth talking to because you have opinions, not because you are agreeable.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: Turn[];
      picks?: Record<string, string | null>;
      tier?: string;
      mode?: Mode;
      currency?: string;
      email?: string;
      save?: boolean;
      /** User messages since the board was first filled. -1 before that. */
      sinceFill?: number;
      /** Stable id for this conversation, minted by the client on turn one. */
      chatId?: string;
    };

    const history = (body.messages ?? [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_TURNS * 2)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    if (!history.length || history[history.length - 1].role !== "user") {
      return NextResponse.json({ success: false, error: "Nothing to answer" }, { status: 400 });
    }

    const userTurns = history.filter((m) => m.role === "user").length;
    if (userTurns > MAX_TURNS) {
      return NextResponse.json(
        { success: false, error: "That is a long conversation. Start a fresh one to keep going." },
        { status: 429 }
      );
    }

    // The gate, positioned after the payoff rather than before it.
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const sinceFill = typeof body.sinceFill === "number" ? body.sinceFill : -1;
    if (sinceFill > FREE_AFTER_FILL && !isValidEmail(email)) {
      return NextResponse.json({ success: false, needsEmail: true }, { status: 200 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limit = await checkRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: "That is a lot of stacks. Try again in an hour." },
        { status: 429 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: false, error: "Advisor is not configured" }, { status: 503 });
    }

    const mode: Mode = (["quick", "scale", "self"] as Mode[]).includes(body.mode as Mode)
      ? (body.mode as Mode)
      : "quick";
    const boardNow = Object.entries(body.picks ?? {})
      .filter(([, v]) => v)
      .map(([slot, opt]) => `${slot}=${opt}`)
      .join(", ");

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: [
        { type: "text" as const, text: SYSTEM },
        {
          // Cached: the catalogue is the same every turn and it is the bulk of
          // the prompt, so this is most of the cost of a conversation.
          type: "text" as const,
          text: `CATALOGUE:\n${JSON.stringify(catalogue())}\n\nBUDGET TIERS:\n${JSON.stringify(
            CHALLENGES.map((c) => ({ id: c.id, budget: c.budget, title: c.title }))
          )}\n\nBUILD TYPES:\n${JSON.stringify(MODES.map((m) => ({ id: m.id, label: m.label, note: m.note })))}`,
          cache_control: { type: "ephemeral" as const },
        },
        {
          type: "text" as const,
          text: `BOARD RIGHT NOW: ${boardNow || "empty"}\nBUILD TYPE: ${mode}\nCURRENCY: ${body.currency || "USD"}`,
        },
      ],
      tools: [TOOL],
      messages: history,
    });

    // Validate anything it tried to change.
    const valid = new Map(SLOTS.map((s) => [s.id, new Set(s.options.map((o) => o.id))]));
    let changes: Record<string, string | null> | null = null;
    let tier: string | null = null;
    let newMode: Mode | null = null;
    let currency: string | null = null;
    let note = "";

    for (const block of msg.content) {
      if (block.type !== "tool_use" || block.name !== "update_stack") continue;
      const input = block.input as {
        set?: Record<string, string | null>;
        tier?: string;
        mode?: string;
        currency?: string;
        note?: string;
      };
      changes = {};
      for (const [slot, opt] of Object.entries(input.set ?? {})) {
        if (!valid.has(slot)) continue;
        if (opt === null) changes[slot] = null;
        else if (typeof opt === "string" && valid.get(slot)!.has(opt)) changes[slot] = opt;
      }
      if (input.tier && CHALLENGES.some((c) => c.id === input.tier)) tier = input.tier;
      if (input.mode && ["quick", "scale", "self"].includes(input.mode)) newMode = input.mode as Mode;
      if (input.currency && /^[A-Z]{3}$/.test(input.currency)) currency = input.currency;
      if (typeof input.note === "string") note = input.note.trim();
    }

    // A turn that only calls the tool has no text in it, which would move the
    // board in silence. The note is the narration in that case.
    const spoken = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    let reply = spoken || note || "Done. The board has changed.";

    // Fixed-answer questions come back with a trailing OPTIONS line, which
    // becomes tappable buttons rather than something to type out.
    let options: string[] = [];
    const m = reply.match(/\[\[OPTIONS:\s*([^\]]+)\]\]/i);
    if (m) {
      options = m[1]
        .split("|")
        .map((o) => o.trim())
        .filter(Boolean)
        .slice(0, 5);
      reply = reply.replace(m[0], "").trim();
    }

    await incrementRateLimit(ip);

    // Once there is an email and a board worth keeping, mint the saved stack.
    let stackId: string | null = null;
    if (isValidEmail(email) && body.save) {
      const finalPicks: Record<string, string> = {};
      for (const [slot, opt] of Object.entries({ ...(body.picks ?? {}), ...(changes ?? {}) })) {
        if (opt && valid.get(slot)?.has(opt)) finalPicks[slot] = opt;
      }
      if (Object.keys(finalPicks).length > 2) {
        const effMode = newMode ?? mode;
        let total = 0;
        for (const [slot, opt] of Object.entries(finalPicks)) {
          const o = SLOTS.find((s) => s.id === slot)?.options.find((x) => x.id === opt);
          if (o) total += priceIn(o.id, o.usd, effMode) ?? 0;
        }
        const brief = history.find((m) => m.role === "user")?.content.slice(0, 300) ?? "A software stack";
        stackId = nanoid(8);
        const { error } = await supabase.from("saved_stacks").insert({
          id: stackId,
          brief,
          picks: finalPicks,
          why: {},
          tier: tier ?? body.tier ?? "c1000",
          mode: effMode,
          currency: currency ?? body.currency ?? "USD",
          total_usd: total,
          email,
        });
        if (error) {
          console.error("saved_stacks insert error:", error);
          stackId = null;
        } else {
          await supabase
            .from("email_subscribers")
            .upsert({ email, source: "stack-advisor" }, { onConflict: "email" });
          syncToBeehiiv(email).catch(() => {});
        }
      }
    }

    /* Keep the conversation, including the ones that go nowhere. Upserted per
       turn so a drop-off is recorded rather than lost, and fire and forget so
       a slow write never delays a reply. */
    const chatId = typeof body.chatId === "string" ? body.chatId.slice(0, 40) : null;
    if (chatId && /^[A-Za-z0-9_-]{6,40}$/.test(chatId)) {
      const transcript = [...history, { role: "assistant", content: reply }];
      supabase
        .from("stack_chats")
        .upsert(
          {
            id: chatId,
            messages: transcript,
            picks: { ...(body.picks ?? {}), ...(changes ?? {}) },
            tier: tier ?? body.tier ?? null,
            mode: newMode ?? mode,
            currency: currency ?? body.currency ?? "USD",
            turns: userTurns,
            email: isValidEmail(email) ? email : null,
            stack_id: stackId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )
        .then(({ error }) => {
          if (error) console.error("stack_chats upsert error:", error);
        });
    }

    return NextResponse.json({ success: true, reply, options, changes, tier, mode: newMode, currency, stackId });
  } catch (e) {
    console.error("stack-chat error:", e);
    return NextResponse.json({ success: false, error: "That did not work" }, { status: 500 });
  }
}
