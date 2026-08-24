/* ── /automation ──────────────────────────────────────────────────────
   Payload for the AUTO keyword (Post 15, "10 automations to steal").

   Design rule, same as the bench page: the reel is the hook, this is the
   receipts. Verdict first because they already know why they clicked, the
   promised list second, then both sides weighted equally, then the
   caveats — which are the whole reason anyone should believe the rest.

   Every number here is live from the production database on 5 Aug 2026.
   The most important one is the least flattering: 969 of 10,106 queued
   messages actually sent. Leaving that out would make the page a brochure.

   NO ASK ANYWHERE. No email gate, no book-a-call. They already commented. */

export const DISCLOSURE =
  "I sell automation software for clinics, so I have an obvious stake in you thinking this works. The numbers below are from my own production database, including the ones that make me look bad. Read the failure rates before the wins.";

export const VERDICT = {
  line: "Automation is worth it where the job is repetitive, bounded and reversible. It is not worth it where being wrong costs you a patient.",
  wins: {
    t: "What it genuinely replaced",
    d: "Answering the same question at 11pm. Chasing a reminder nobody read. Typing out availability for the fifth time that day. 10,793 patient messages answered without anyone opening a laptop.",
  },
  didnt: {
    t: "What it did not replace",
    d: "Judgement. Every one of the 103 escalations was a conversation a human needed to have, and the automation's only useful job was noticing that fast and getting out of the way.",
  },
};

export interface Auto {
  n: number;
  name: string;
  replaces: string;
  /** Live volume, or null when it isn't running yet. */
  evidence: string | null;
  /** The thing that bites. Never omitted. */
  catch: string;
}

export const TEN: Auto[] = [
  { n: 1, name: "Appointment reminders", replaces: "A person reading tomorrow's list and texting each one",
    evidence: "7,344 queued", catch: "The highest volume and the lowest value. It only pays if the reply comes back into the same thread, otherwise you have automated a monologue." },
  { n: 2, name: "Answer the reply", replaces: "Someone watching an inbox all evening",
    evidence: "10,793 patient messages answered", catch: "This is the one that actually earns its keep, and it is also the one that needs the most guard rails. See the caveats." },
  { n: 3, name: "Book from a text", replaces: "Phone tag to find a time",
    evidence: "188 bookings from 1,040 calls", catch: "Writing to a real diary is the highest-risk automation on this list. Everything else can be wrong and recoverable. This one cannot." },
  { n: 4, name: "Post-visit follow-up", replaces: "The check-in nobody has time to send",
    evidence: "2,129 queued", catch: "Easy to make annoying. Once per visit, never on a schedule that ignores whether they replied last time." },
  { n: 5, name: "Reactivation", replaces: "A list of lapsed patients nobody calls",
    evidence: "301 queued", catch: "The one people get most excited about and the one most likely to breach marketing consent. Gate it on opt-in, not on last-visit date." },
  { n: 6, name: "Missed call, text back", replaces: "A voicemail nobody checks",
    evidence: "1,040 calls handled", catch: "Only useful if the text opens a thread you can actually answer. Otherwise you have replaced one dead end with another." },
  { n: 7, name: "Voice message capture", replaces: "A notepad by the phone",
    evidence: "523 completed calls", catch: "Transcription is the easy half. Deciding what is urgent is the half that still needs a person." },
  { n: 8, name: "Escalate to a human", replaces: "Nobody noticing the bot is stuck",
    evidence: "103 escalations", catch: "The most underrated automation here. If you build one thing, build the one that admits defeat quickly." },
  { n: 9, name: "Daily recap to the owner", replaces: "Logging in to find out what happened",
    evidence: "Running for 3 accounts", catch: "Send it once a day at a fixed local hour. Anything more frequent gets filtered, and then you have automated something nobody reads." },
  { n: 10, name: "Two-way diary sync", replaces: "Double bookings and manual re-entry",
    evidence: "559,017 appointments synced", catch: "Not glamorous, and everything above depends on it. When the sync gaps, every other automation confidently acts on stale data." },
];

/* ── the honest half ──────────────────────────────────────────────── */

export const GOOD_AT = [
  "Repetitive work with a narrow set of correct answers.",
  "Being awake. Most of the value is simply replying at 9pm on a Sunday.",
  "Never getting bored on message four hundred.",
  "Noticing it is out of its depth, if you build that in deliberately.",
];

export const BAD_AT = [
  "Anything where being wrong costs a relationship rather than a minute.",
  "Identity. Two patients share a phone number more often than you would think, and software guesses badly.",
  "Knowing when the rule should not apply. That is the whole job of a good receptionist.",
  "Fixing a broken process. It will just run the broken process faster.",
];

/* ── caveats: the section that buys the rest of the page ───────────── */

export const CAVEATS = [
  { t: "Only 969 of 10,106 queued messages actually sent",
    d: "That is 9.6%. Most were skipped or disabled by guard rails working correctly, which is the point of guard rails. But 1,733 outright failed, and that is a real number, not rounding. Anyone showing you an automation deck without a failure rate is showing you a demo." },
  { t: "\"Completed\" is not \"booked\"",
    d: "1,040 voice calls produced 523 completions and 188 bookings. If I quoted the completion number this page would look twice as good and mean half as much." },
  { t: "One vertical, one country, one PMS family",
    d: "Allied health clinics in Australia on Cliniko and PracSuite. The shapes generalise, the numbers do not." },
  { t: "These are cumulative, not monthly",
    d: "Every figure is a lifetime total across several accounts and several months. Divide before you compare it to anything." },
  { t: "I have not solved identity",
    d: "2,863 patients in one account share a mobile with another patient. Phone-only matching is ambiguous for 15% of that book, and I found that out by filing a reply under the wrong person's name." },
];

export const SOURCE_NOTE =
  "Numbers pulled live from the production Postgres on 5 August 2026: patients, appointments, chatbot_messages, outbound_messages and voice_calls. No sampling, no projections, no modelled figures. Where something is not running yet it says so rather than being left out.";
