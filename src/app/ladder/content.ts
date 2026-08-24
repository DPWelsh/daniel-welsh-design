/* ── /ladder, Field Guide № 004, the hub ─────────────────────────────
   The LADDER keyword lands HERE, and this page is a menu: seven rungs,
   each one its own build sheet at /ladder/<slug>.

   It was originally one page with the Taylor build in it and the ladder
   as a section, backwards. The ladder is the series; a build is one
   rung of it. Adding rung two means adding a route and flipping `live`,
   nothing else.

   Source of truth for the rung table: content/Routiq Stack Series/
   Reels-Product-remake/"00 - SERIES - If I was to remake.md". */

export const LEDE =
  "Seven world-famous apps, one per rung. Each one gets a build sheet that answers the same question: if I had to rebuild this from scratch, what would it actually take? The apps get more famous going down the list. That is not what makes them harder.";

export const THESIS =
  "How hard an app is has nothing to do with how famous it is. It is about how bad it is when it goes wrong.";

export type Rung = {
  n: string;
  app: string;
  rung: string;
  time: string;
  /** Only on live rungs, an unbuilt rung has no honest number. */
  cost?: string;
  /** Set once the build sheet exists; until then the row is inert. */
  href?: string;
  live?: boolean;
  /** One line on what changes at this rung, the reason to keep reading. */
  shift: string;
};

export const RUNGS: Rung[] = [
  {
    n: "1",
    app: "Taylor Swift's website",
    rung: "A page that sits there",
    time: "about an hour",
    cost: "about $35",
    href: "/ladder/taylor-swift",
    live: true,
    shift: "Nothing to type, nothing saved, nothing changes when you visit.",
  },
  {
    n: "2",
    app: "Oasis ticket presale",
    rung: "A box you type in",
    time: "a day",
    shift: "Something leaves the page. Now you own whatever they typed.",
  },
  {
    n: "3",
    app: "Wordle",
    rung: "A tool that answers a question",
    time: "a weekend",
    shift: "It has to be right, and it has to be right the same way twice.",
  },
  {
    n: "4",
    app: "Duolingo",
    rung: "People log in",
    time: "weeks",
    shift: "Accounts. The first rung where losing data is losing someone's history.",
  },
  {
    n: "5",
    app: "Spotify",
    rung: "It takes money",
    time: "months",
    shift: "Getting it wrong is now a refund, a chargeback, or a regulator.",
  },
  {
    n: "6",
    app: "Uber Eats",
    rung: "It does things for people",
    time: "a year before you trust it",
    cost: "~$750/yr to run",
    href: "/ladder/uber-eats",
    live: true,
    shift: "It acts on its own. A bug is now someone's dinner, or their income.",
  },
  {
    n: "7",
    app: "The CommBank app",
    rung: "Other people's day stops",
    time: "you don't finish it, you staff it",
    shift: "When it breaks, strangers can't buy food. There is no ship-and-see.",
  },
];

export const RUNGS_CLOSER =
  "Past seven it isn't an app, it's a payroll. And the whole point of the list: the biggest artist alive lives on rung one.";

export const WHATS_IN_ONE = [
  "Every input you need before you write a line of code.",
  "The exact tools, and the calls and prompts worth copying.",
  "Numbered steps with a check at the end of each, so you know it worked before you move on.",
  "What it costs to build and to run, on two different stacks.",
];

export const CLOSING =
  "Start at rung one. It is the only one you can finish today, and the credibility you spend agreeing with it is what makes the scary rungs believable.";

