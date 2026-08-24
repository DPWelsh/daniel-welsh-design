"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CHALLENGES, SECTIONS, SLOTS, grade, type Challenge, type Option, type Slot } from "./stack-data";
import { MODES, lockReason, priceIn, type Mode } from "./build-modes";
import { CURRENCIES, type Rates } from "./rates";
import { serif, mono } from "../scratch/ui";
import { Logo } from "./logo";
import { DetailCard } from "./detail-card";
import { CLAY, CLOUD, CORE, DIM, FAINT, PROMPT, RULE, RULE_SOFT, money } from "./theme";

export function Calculator({ rates }: { rates: Rates }) {
  const [challenge, setChallenge] = useState<Challenge>(CHALLENGES[1]);
  const [mode, setMode] = useState<Mode>("quick");
  const [cur, setCur] = useState<string>("USD");
  const [picks, setPicks] = useState<Record<string, string | null>>({});
  const [showDaniel, setShowDaniel] = useState(false);
  const [copied, setCopied] = useState(false);
  /* The detail pane always has a subject, because on desktop it is always
     on screen: every press in the list swaps what it is showing. On a phone
     there is no room for a rail, so the same card opens as a sheet from the
     ⓘ only, and a plain pick never interrupts. */
  const [detail, setDetail] = useState<{ slot: Slot; opt: Option }>({
    slot: SLOTS[0],
    opt: SLOTS[0].options[0],
  });
  const [sheet, setSheet] = useState(false);
  /* The advisor. Changes come back as slot ids the server already validated
     against the catalogue, so nothing here can name a tool that has no price. */
  const [chat, setChat] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [needsEmail, setNeedsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [stackId, setStackId] = useState<string | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  /* User messages since the advisor first filled the board. -1 until it has. */
  const [sinceFill, setSinceFill] = useState(-1);
  /* One id per conversation so the server can keep the transcript together,
     minted lazily because a visitor who never opens the chat needs no row. */
  const chatId = useRef<string | null>(null);
  const chatScroll = useRef<HTMLDivElement>(null);
  /* Rows the last reply moved, so you can see what changed rather than
     hunting for it in a board of thirty-seven. */
  const [flash, setFlash] = useState<string[]>([]);

  const slotById = useMemo(() => {
    const m: Record<string, Slot> = {};
    for (const s of SLOTS) m[s.id] = s;
    return m;
  }, []);

  const activeSlotIds = useMemo(
    () => (challenge.open ? SLOTS.map((s) => s.id) : [...challenge.required, ...challenge.optional]),
    [challenge],
  );

  const priceOf = (sid: string): number => {
    const oid = picks[sid];
    if (!oid) return 0;
    const opt = slotById[sid].options.find((o) => o.id === oid);
    return opt ? (priceIn(opt.id, opt.usd, mode) ?? 0) : 0;
  };

  const total = useMemo(
    () => SLOTS.reduce((t, s) => t + priceOf(s.id), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [picks, mode],
  );

  const requiredFilled = challenge.required.every((sid) => picks[sid]);
  const optionalCount = challenge.optional.filter((sid) => picks[sid]).length;
  const over = !challenge.open && total > challenge.budget;
  const result = challenge.open
    ? null
    : grade(total, challenge.budget, requiredFilled, optionalCount, challenge.optional.length);
  const toolCount = SLOTS.filter((s) => picks[s.id]).length;
  const slotsLeft = challenge.required.filter((s) => !picks[s]).length;

  const switchChallenge = (c: Challenge) => {
    setChallenge(c);
    setPicks({});
    setShowDaniel(false);
    setCopied(false);
    setSheet(false);
  };

  const mineIn = (sid: string): string | null => {
    const want = challenge.daniel[sid];
    if (!want) return null;
    const slot = slotById[sid];
    const opt = slot?.options.find((o) => o.id === want);
    if (!opt) return null;
    if (priceIn(opt.id, opt.usd, mode) !== null) return opt.id;
    // Same vendor, next tier that survives this mode. Free tier died at
    // 10k users? Take the paid one from the same people.
    const live = slot.options.filter((o) => priceIn(o.id, o.usd, mode) !== null);
    const byPrice = (a: Option, b: Option) =>
      (priceIn(a.id, a.usd, mode) ?? 0) - (priceIn(b.id, b.usd, mode) ?? 0);
    const sameVendor = live.filter((o) => o.name === opt.name).sort(byPrice)[0];
    // Nobody from that vendor survives (self-hosting Vercel is not a thing),
    // so the honest answer is the cheapest row that does.
    return (sameVendor ?? live.sort(byPrice)[0])?.id ?? null;
  };

  /* A pick that the new mode locks would otherwise sit there selected and
     priced at zero, which is the worst of both. Drop it. */
  const switchMode = (m: Mode) => {
    setMode(m);
    setPicks((p) => {
      const next: Record<string, string | null> = {};
      for (const [sid, oid] of Object.entries(p)) {
        const opt = oid ? slotById[sid]?.options.find((o) => o.id === oid) : null;
        next[sid] = opt && priceIn(opt.id, opt.usd, m) !== null ? oid : null;
      }
      return next;
    });
    setShowDaniel(false);
  };

  const pick = (sid: string, oid: string) =>
    setPicks((p) => ({ ...p, [sid]: p[sid] === oid ? null : oid }));

  /* One delivery path. `send` appends what you typed and delivers; the email
     form delivers the conversation as it already stands, because the message
     it is gating is still sitting at the end of it. Removing and re-sending
     it duplicated the message, since the removal had not landed in state by
     the time the resend read it. */
  async function deliver(convo: { role: "user" | "assistant"; content: string }[], withEmail?: string) {
    if (!chatId.current) {
      chatId.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID().replace(/-/g, "").slice(0, 20)
          : String(Date.now()) + Math.floor(Math.random() * 1e6);
    }
    setSending(true);
    setChatError(null);
    setOptions([]);
    try {
      const res = await fetch("/api/stack-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: convo,
          picks,
          tier: challenge.id,
          mode,
          currency: cur,
          email: withEmail ?? email,
          sinceFill,
          chatId: chatId.current,
          save: !stackId && !!(withEmail ?? email),
        }),
      });
      const data = await res.json();

      if (data.needsEmail) {
        setNeedsEmail(true);
        return;
      }
      if (!data.success) {
        setChatError(data.error || "That did not work");
        return;
      }

      setNeedsEmail(false);
      setChat([...convo, { role: "assistant" as const, content: data.reply }]);
      setOptions(Array.isArray(data.options) ? data.options : []);
      if (data.changes && Object.keys(data.changes).length) {
        setSinceFill((n) => (n < 0 ? 0 : n));
        setPicks((p) => ({ ...p, ...data.changes }));
        setFlash(Object.keys(data.changes));
        window.setTimeout(() => setFlash([]), 1600);
        setShowDaniel(false);
      }
      if (data.tier) {
        const c = CHALLENGES.find((x) => x.id === data.tier);
        if (c) setChallenge(c);
      }
      if (data.mode) setMode(data.mode);
      if (data.currency) setCur(data.currency);
      if (data.stackId) setStackId(data.stackId);
    } catch {
      setChatError("That did not work");
    } finally {
      setSending(false);
    }
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const next = [...chat, { role: "user" as const, content: trimmed }];
    setChat(next);
    setInput("");
    setSinceFill((n) => (n < 0 ? n : n + 1));
    await deliver(next);
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || sending) return;
    await deliver(chat, email);
  }

  const loadDaniel = () => {
    const next: Record<string, string | null> = {};
    for (const sid of Object.keys(challenge.daniel)) next[sid] = mineIn(sid);
    setPicks(next);
    setShowDaniel(true);
  };

  const danielTotal = useMemo(() => {
    let t = 0;
    for (const sid of Object.keys(challenge.daniel)) {
      const oid = mineIn(sid);
      const opt = oid ? slotById[sid]?.options.find((o) => o.id === oid) : null;
      if (opt) t += priceIn(opt.id, opt.usd, mode) ?? 0;
    }
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, slotById, mode]);

  const share = async () => {
    const blocks = 10;
    const filled = challenge.open
      ? 0
      : Math.min(blocks, Math.round((total / challenge.budget) * blocks));
    const bar = "🟩".repeat(Math.max(0, filled)) + "⬜".repeat(Math.max(0, blocks - filled));
    const lines = challenge.open
      ? [
          "MY STACK",
          `${m$(total)} a month · ${toolCount} tools`,
          "danielwelsh.design/saas-calc",
        ]
      : [
          `STACK BUILDER · ${challenge.title}`,
          `${m$(total)} of ${m$(challenge.budget)} · ${result ? `grade ${result.mark}` : over ? "OVER BUDGET" : "unfinished"} · ${toolCount} tools`,
          bar,
          "danielwelsh.design/saas-calc",
        ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  const rate = rates.table[cur] ?? 1;
  const m$ = (n: number) => money(n, cur, rate);

  const advisorPanel = (
    <div className="flex flex-col" style={{ backgroundColor: CORE }}>
            <div
              className="flex items-center justify-between px-5 pb-3 pt-4"
              style={{ borderBottom: "1px solid rgba(237,237,235,0.14)" }}
            >
              <span className={`${mono} text-[10px] uppercase tracking-[0.2em]`} style={{ color: CLAY }}>
                The advisor
              </span>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close"
                className="-mr-2 cursor-pointer px-2 text-[14px] transition-opacity hover:opacity-60"
                style={{ color: "rgba(237,237,235,0.5)" }}
              >
                ✕
              </button>
            </div>

            <div ref={chatScroll} className="max-h-[min(58vh,480px)] overflow-y-auto px-5 py-4">
              {chat.length === 0 && (
                <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(237,237,235,0.78)" }}>
                  Describe what you are building. I will fill the board, then you can argue with me
                  about any row.
                </p>
              )}

              {chat.map((m, k) =>
                m.role === "user" ? (
                  <div key={k} className="mt-3 flex justify-end">
                    <p
                      className="max-w-[85%] px-3 py-2 text-[14px] leading-[1.5]"
                      style={{ backgroundColor: CLOUD, color: CORE }}
                    >
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={k} className="mt-3 flex gap-2.5">
                    <span
                      className={`${mono} mt-[3px] shrink-0 text-[10px] leading-none`}
                      style={{ color: CLAY }}
                      aria-hidden
                    >
                      ●
                    </span>
                    <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(237,237,235,0.82)" }}>
                      {m.content}
                    </p>
                  </div>
                )
              )}

              {sending && (
                <div className="mt-3 flex gap-2.5">
                  <span className={`${mono} mt-[3px] shrink-0 text-[10px] leading-none`} style={{ color: CLAY }} aria-hidden>
                    ●
                  </span>
                  <span className="sb-dots flex items-center gap-1 pt-1" aria-label="thinking">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              )}

              {/* Fixed-answer questions are buttons, not typing homework. */}
              {options.length > 0 && !sending && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {options.map((o) => (
                    <button
                      key={o}
                      onClick={() => send(o)}
                      className={`${mono} cursor-pointer border px-2.5 py-1.5 text-[11px] transition-colors hover:bg-white/10`}
                      style={{ borderColor: "rgba(237,237,235,0.28)", color: CLOUD }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}


              {stackId && (
                <p
                  className="mt-4 border-l-2 py-1 pl-4 text-[13px] leading-relaxed"
                  style={{ borderColor: CLAY, color: "rgba(237,237,235,0.78)" }}
                >
                  Saved.{" "}
                  <a
                    href={`/saas-calc/${stackId}`}
                    className="underline underline-offset-4"
                    style={{ color: PROMPT }}
                  >
                    Your stack has its own page
                  </a>
                  , sendable to whoever has to agree with it.
                </p>
              )}

              {chatError && (
                <p className="mt-3 text-[13px]" style={{ color: "#e08b86" }}>
                  {chatError}
                </p>
              )}
            </div>

            <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(237,237,235,0.14)" }}>
              {needsEmail ? (
                <form onSubmit={submitEmail} className="pt-4">
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(237,237,235,0.78)" }}>
                    Where should I send the finished stack? You get a link to it, and I keep going.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <input
                      autoFocus
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@work.com"
                      className={`${mono} min-w-0 flex-1 border px-3 py-2.5 text-[13px] outline-none`}
                      style={{
                        borderColor: "rgba(237,237,235,0.18)",
                        backgroundColor: "rgba(237,237,235,0.06)",
                        color: CLOUD,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className={`${mono} shrink-0 cursor-pointer px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90 disabled:opacity-40`}
                      style={{ backgroundColor: PROMPT, color: CORE }}
                    >
                      send it
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex gap-2 pt-4"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={600}
                    placeholder={chat.length ? "why that one? or tell me to change it" : "a booking app for barbers"}
                    className={`${mono} min-w-0 flex-1 border px-3 py-2.5 text-[13px] outline-none`}
                    style={{
                      borderColor: "rgba(237,237,235,0.18)",
                      backgroundColor: "rgba(237,237,235,0.06)",
                      color: CLOUD,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sending || input.trim().length < 2}
                    className={`${mono} shrink-0 cursor-pointer px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90 disabled:opacity-40`}
                    style={{ backgroundColor: PROMPT, color: CORE }}
                  >
                    {sending ? "…" : chat.length ? "send" : "go"}
                  </button>
                </form>
              )}
              {chat.length > 0 && !needsEmail && (
                <p className={`${mono} mt-2.5 text-[10px] leading-relaxed`} style={{ color: "rgba(237,237,235,0.4)" }}>
                  Ask why and the board stays put. Tell it to change something and the row moves.
                </p>
              )}
            </div>
          </div>
  );

  const pct = challenge.budget > 0 ? Math.min(100, (total / challenge.budget) * 100) : 0;

  /* Scroll the panel, never the page. scrollIntoView walks up to the window
     and drags the whole document with it, which reads as the page jumping to
     the top on every message. */
  useEffect(() => {
    const el = chatScroll.current;
    if (chatOpen && el) el.scrollTop = el.scrollHeight;
  }, [chat, sending, chatOpen, options.length]);

  /* A sheet you cannot close from the keyboard is a trap. */
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  return (
    <div>
      {/* Shared CSS (stampIn, paneIn, .sb-cta, .sb-info) is on the page. */}

      {/* ── Challenge picker, sticky so the budgets ride the scroll ── */}
      <div
        className="sticky top-0 z-30 -mx-6 mt-10 px-6 pb-3 pt-3 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        style={{ backgroundColor: CLOUD, borderBottom: `1px solid ${RULE}` }}
      >
        <div className="-mx-1 mb-2 flex items-center gap-x-2 overflow-x-auto px-1 pb-0.5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <span
            className={`${mono} mr-1 hidden shrink-0 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] sm:inline`}
            style={{ color: FAINT }}
          >
            Build type
          </span>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              title={m.note}
              className={`${mono} shrink-0 cursor-pointer whitespace-nowrap border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] transition-colors`}
              style={{
                borderColor: mode === m.id ? CORE : RULE,
                backgroundColor: mode === m.id ? CORE : "transparent",
                color: mode === m.id ? CLOUD : DIM,
              }}
            >
              {m.label}
            </button>
          ))}
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            <label htmlFor="cur" className={`${mono} hidden text-[10px] uppercase tracking-[0.16em] sm:inline`} style={{ color: FAINT }}>
              Currency
            </label>
            <select
              id="cur"
              value={cur}
              onChange={(e) => setCur(e.target.value)}
              title={
                cur === "USD"
                  ? "Vendor list prices, as billed"
                  : `Converted at ${rate.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${cur} to the US dollar${rates.updated ? `, ${rates.updated}` : ""}`
              }
              className={`${mono} cursor-pointer border px-2 py-1 text-[10px] uppercase tracking-[0.12em]`}
              style={{ borderColor: CORE, backgroundColor: CORE, color: CLOUD }}
            >
              {CURRENCIES.filter((c) => rates.table[c]).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-3">
          {CHALLENGES.map((c) => (
            <button
              key={c.id}
              onClick={() => switchChallenge(c)}
              className="w-[132px] shrink-0 snap-start cursor-pointer border px-2.5 py-2 text-left transition-colors sm:w-auto sm:px-3"
              style={{
                borderColor: challenge.id === c.id ? CORE : RULE,
                backgroundColor: challenge.id === c.id ? "rgba(26,28,18,0.05)" : "transparent",
              }}
            >
              <span
                className={`${serif} block whitespace-nowrap text-[15px] sm:text-lg`}
                style={{ color: CORE }}
              >
                {c.open ? c.label : `under ${m$(c.budget)}`}
              </span>
              <span
                className={`${mono} mt-0.5 block truncate text-[9px] uppercase leading-[1.3] tracking-[0.1em] sm:whitespace-normal`}
                style={{ color: CLAY }}
              >
                {c.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
        {challenge.blurb}
      </p>
      {mode !== "quick" && (
        <p className="mt-2.5 max-w-2xl border-l-2 py-1 pl-4 text-[14px] leading-relaxed" style={{ borderColor: CLAY, color: DIM }}>
          <span className={`${mono} mr-2 text-[11px] uppercase tracking-[0.16em]`} style={{ color: CLAY }}>
            {MODES.find((m) => m.id === mode)?.label}
          </span>
          {MODES.find((m) => m.id === mode)?.note}
        </p>
      )}

      {/* ── The advisor ─────────────────────────────────────────────
          On desktop it takes the detail rail's column, because two dark
          panels stacked on each other is not one page. On a phone there is
          no rail, so it floats. Same markup either way. */}
      {!chatOpen && (
        <div className="fixed bottom-[86px] right-4 z-50 sm:bottom-[104px] sm:right-6">
          <button
            onClick={() => setChatOpen(true)}
            className={`${mono} sb-cta cursor-pointer border-2 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em]`}
            style={{ borderColor: CORE, backgroundColor: CORE, color: CLOUD }}
          >
            <span style={{ color: CLAY }}>●</span>{" "}
            {chat.length ? "back to the advisor" : "not sure? ask the advisor"}
          </button>
        </div>
      )}
      {chatOpen && (
        <div
          className="fixed bottom-[86px] right-4 z-50 w-[calc(100vw-2rem)] max-w-[380px] sm:bottom-[104px] sm:right-6"
          style={{ boxShadow: `7px 7px 0 ${CLAY}`, animation: "paneIn .2s cubic-bezier(.2,.8,.3,1) both" }}
        >
          {advisorPanel}
        </div>
      )}

      {/* ── What I'd use at this budget ────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {!showDaniel ? (
          <button
            onClick={loadDaniel}
            className={`${mono} sb-cta cursor-pointer border-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em]`}
            style={{ borderColor: CORE, color: CLOUD, backgroundColor: CORE }}
          >
            {challenge.open
              ? "Load the stack I actually run"
              : `What I'd use with ${m$(challenge.budget)} a month`}{" "}
            <span className="sb-arrow" aria-hidden>
              →
            </span>
          </button>
        ) : (
          <p className="max-w-2xl border-l-2 py-1 pl-4 text-[15px] leading-relaxed" style={{ borderColor: CLAY, color: DIM }}>
            <span className={`${mono} mr-2 text-[11px] uppercase tracking-[0.16em]`} style={{ color: CLAY }}>
              My build · {m$(danielTotal)}/mo
            </span>
            {challenge.danielLine} Loaded below, tweak it from here.
          </p>
        )}
        <span className={`${mono} text-[11px] tracking-[0.06em]`} style={{ color: FAINT }}>
          <span style={{ color: CLAY }}>●</span> marks what I&rsquo;d run
          {challenge.open ? "" : " at this budget"} · every press updates the panel
        </span>
      </div>

      {/* ── Walkthrough on the left, the detail rail on the right ── */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start lg:gap-8">
        <div>
      {SECTIONS.map((section) => {
        const ids = section.slotIds;
        const subtotal = ids
          .filter((sid) => activeSlotIds.includes(sid))
          .reduce((t, sid) => t + priceOf(sid), 0);
        return (
          <div key={section.id} className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3" style={{ borderColor: RULE }}>
              <div>
                <h2 className={`${serif} text-2xl sm:text-3xl`} style={{ color: CORE }}>
                  {section.title}
                </h2>
                <p className="mt-1 text-[13px]" style={{ color: FAINT }}>
                  {section.blurb}
                </p>
              </div>
              <span className={`${mono} text-[13px] tracking-[0.08em]`} style={{ color: DIM }}>
                {m$(subtotal)}/mo
              </span>
            </div>

            <div className="mt-2 space-y-5">
              {ids.map((sid) => {
                const slot = slotById[sid];
                const chosen = picks[sid];
                const isActive = activeSlotIds.includes(sid);
                const isRequired = challenge.required.includes(sid);
                return (
                  <div
                    key={sid}
                    className="border-b pb-5 pt-3 transition-colors"
                    style={{
                      borderColor: RULE_SOFT,
                      opacity: isActive ? 1 : 0.75,
                      backgroundColor: flash.includes(sid) ? "rgba(123,162,224,0.16)" : "transparent",
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[15px] font-semibold" style={{ color: CORE }}>
                        {slot.label}
                      </span>
                      <span
                        className={`${mono} text-[10px] uppercase tracking-[0.14em]`}
                        style={{ color: !isActive ? FAINT : isRequired ? (chosen ? FAINT : CLAY) : FAINT }}
                      >
                        {challenge.open
                          ? chosen
                            ? "in your stack"
                            : ""
                          : !isActive
                            ? `free tiers only under ${m$(challenge.budget)}`
                            : isRequired
                              ? chosen
                                ? ""
                                : "required"
                              : chosen
                                ? ""
                                : "bonus"}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {slot.options.map((o) => {
                        const modePrice = priceIn(o.id, o.usd, mode);
                        const modeLocked = modePrice === null;
                        const price = modePrice ?? o.usd;
                        const locked = modeLocked || (!isActive && price > 0);
                        const on = chosen === o.id;
                        const mine = mineIn(sid) === o.id;
                        return (
                          // Two controls, one visual chip. The chip picks, the ⓘ
                          // explains. A button cannot nest inside a button, so
                          // the border lives on the wrapper.
                          <div
                            key={o.id}
                            className="flex items-stretch border transition-colors"
                            style={{
                              borderColor: on ? CORE : RULE_SOFT,
                              backgroundColor: on ? CORE : "transparent",
                              opacity: locked ? 0.35 : 1,
                            }}
                          >
                            <button
                              disabled={locked}
                              onClick={() => {
                                pick(sid, o.id);
                                setDetail({ slot, opt: o });
                              }}
                              title={
                                modeLocked
                                  ? lockReason(mode)
                                  : locked
                                    ? `not worth paying for under ${m$(challenge.budget)} a month`
                                    : o.eg
                              }
                              className="flex cursor-pointer items-center gap-2 py-2 pl-3 pr-2 disabled:cursor-not-allowed"
                            >
                              <Logo opt={o} />
                              <span className="text-[13px] font-medium" style={{ color: on ? CLOUD : CORE }}>
                                {o.name}
                              </span>
                              <span className={`${mono} text-[11px]`} style={{ color: on ? "rgba(237,237,235,0.7)" : FAINT }}>
                                {o.plan} · {modeLocked ? "out" : m$(price)}
                              </span>
                              {mine && (
                                <span
                                  className="text-[10px] leading-none"
                                  style={{ color: on ? CLOUD : CLAY }}
                                  title={`what I'd run with ${m$(challenge.budget)} a month`}
                                >
                                  ●
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setDetail({ slot, opt: o });
                                setSheet(true);
                              }}
                              aria-label={`What ${o.name} is`}
                              title={`What ${o.name} is`}
                              className="sb-info cursor-pointer pr-2.5 pl-1 text-[13px] leading-none"
                              style={{ color: on ? CLOUD : CORE }}
                            >
                              ⓘ
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

        </div>

        {/* The rail. Always on screen from lg up, swaps on every press. */}
        <aside className="sticky top-[190px] mt-14 hidden max-h-[calc(100vh-330px)] overflow-y-auto lg:block">
          <DetailCard
            slot={detail.slot}
            opt={detail.opt}
            mine={mineIn(detail.slot.id) === detail.opt.id}
            picked={picks[detail.slot.id] === detail.opt.id}
            budgetLabel={challenge.open ? null : m$(challenge.budget)}
            price={priceIn(detail.opt.id, detail.opt.usd, mode)}
            lockedNote={
              priceIn(detail.opt.id, detail.opt.usd, mode) === null
                ? `Not in this build: it ${lockReason(mode)}.`
                : null
            }
            usdNote={cur !== "USD"}
            m$={m$}
            onPick={() => pick(detail.slot.id, detail.opt.id)}
          />
        </aside>
      </div>

      {/* Same card as a sheet on a phone, where there is no room for a rail. */}
      {sheet && (
        <div className="lg:hidden">
          <button
            aria-label="Close"
            onClick={() => setSheet(false)}
            className="fixed inset-0 z-40 h-full w-full cursor-default bg-black/35"
          />
          <aside
            role="dialog"
            aria-label={`${detail.opt.name} details`}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-[400px] overflow-y-auto pb-24"
            style={{ backgroundColor: CORE, animation: "paneIn .22s cubic-bezier(.2,.8,.3,1) both" }}
          >
            <DetailCard
              slot={detail.slot}
              opt={detail.opt}
              mine={mineIn(detail.slot.id) === detail.opt.id}
              picked={picks[detail.slot.id] === detail.opt.id}
              budgetLabel={challenge.open ? null : m$(challenge.budget)}
              price={priceIn(detail.opt.id, detail.opt.usd, mode)}
              lockedNote={
                priceIn(detail.opt.id, detail.opt.usd, mode) === null
                  ? `Not in this build: it ${lockReason(mode)}.`
                  : null
              }
              usdNote={cur !== "USD"}
            m$={m$}
              onPick={() => {
                pick(detail.slot.id, detail.opt.id);
                setSheet(false);
              }}
              onClose={() => setSheet(false)}
            />
          </aside>
        </div>
      )}

      {/* ── Sticky scoreboard ──────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40" style={{ backgroundColor: CORE }}>
        <div className="mx-auto max-w-5xl px-5 pb-3 pt-2.5 sm:px-8 sm:pb-4 sm:pt-3 lg:px-10">
          {!challenge.open && (
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(237,237,235,0.18)" }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: over ? "#c96b66" : pct > 85 ? CLAY : PROMPT }}
              />
            </div>
          )}
          <div className="mt-2 flex flex-nowrap items-center justify-between gap-x-4 sm:mt-2.5 sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
              <span className={`${serif} whitespace-nowrap text-2xl sm:text-4xl`} style={{ color: over ? "#c96b66" : CLOUD }}>
                {m$(total)}
                <span className={`${mono} ml-2 text-[12px] font-normal tracking-[0.1em]`} style={{ color: "rgba(237,237,235,0.65)" }}>
                  {challenge.open ? "A MONTH" : `OF ${m$(challenge.budget)}`}
                </span>
              </span>
              <span className={`${mono} hidden whitespace-nowrap text-[12px] tracking-[0.1em] sm:inline`} style={{ color: "rgba(237,237,235,0.65)" }}>
                {toolCount} TOOL{toolCount === 1 ? "" : "S"}
              </span>
              {!requiredFilled && (
                <span className={`${mono} hidden whitespace-nowrap text-[12px] tracking-[0.1em] sm:inline`} style={{ color: "rgba(237,237,235,0.65)" }}>
                  {slotsLeft} SLOT{slotsLeft === 1 ? "" : "S"} LEFT
                </span>
              )}
              {over && (
                <span className={`${mono} text-[12px] tracking-[0.14em]`} style={{ color: "#c96b66" }}>
                  OVER BUDGET
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {result && (
                <span
                  key={`${challenge.id}-${result.mark}-${total}`}
                  className={`${serif} flex h-10 w-10 items-center justify-center border-2 text-2xl `}
                  style={{
                    color: CLOUD,
                    borderColor: result.mark === "S" ? CLAY : "rgba(237,237,235,0.5)",
                    animation: "stampIn 0.45s ease-out both",
                  }}
                  title={result.verdict}
                >
                  {result.mark}
                </span>
              )}
              <button
                onClick={share}
                className={`${mono} cursor-pointer whitespace-nowrap border px-3 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-[11px]`}
                style={{
                  borderColor: PROMPT,
                  color: copied ? CORE : PROMPT,
                  backgroundColor: copied ? PROMPT : "transparent",
                }}
              >
                {copied ? "copied" : challenge.open ? "copy my stack" : "share result"}
              </button>
            </div>
          </div>
          {result && (
            <p className={`${mono} mt-1.5 hidden text-[11px] tracking-[0.04em] sm:block`} style={{ color: "rgba(237,237,235,0.65)" }}>
              {result.verdict}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
