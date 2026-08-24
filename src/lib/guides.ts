/* The index of everything on labs that walks you through something.
   Lives here rather than on a page because three surfaces consume it:
   /guides (the front door), the ladder hub, and the console top bars.
   Order is the order you would actually do them in. */
export type Guide = { href: string; name: string; what: string; when: string };

export const GUIDES: Guide[] = [
  {
    href: "/get-started",
    name: "Day Zero",
    what: "A brand-new laptop to a live URL. Accounts, installs, first site.",
    when: "Once, ever. Before rung one.",
  },
  {
    href: "/ladder/taylor-swift",
    name: "Rung one · the build",
    what: "Eight steps and the prompts, from a scrape to a pointed domain.",
    when: "An afternoon, about $35.",
  },
  {
    href: "/presets",
    name: "Brand kit from photos",
    what: "A palette with real hex values, and a Lightroom preset to match.",
    when: "Alongside step 03 of any build.",
  },
  {
    href: "/ladder/uber-eats",
    name: "Rung six · the reference",
    what: "Order, payment and dispatch: components, state machines, invariants.",
    when: "~$750/yr to run. Read before you quote one.",
  },
  {
    href: "/scratch",
    name: "Field Guide 001 · Scratch",
    what: "The five beginner mistakes, and the six stages that fix them.",
    when: "After your first build goes wrong.",
  },
  {
    href: "/ship",
    name: "Field Guide 002 · Ship",
    what: "The three checks before anyone else touches your app.",
    when: "Before you give someone the link.",
  },
  {
    href: "/scale",
    name: "Field Guide 003 · Scale",
    what: "Which of the nine tools change at 10,000 users, and what triggers each.",
    when: "When a bill starts to sting.",
  },
  {
    href: "/launch",
    name: "Field Guide 004 · Launch",
    what: "The five things before the link goes out: preview, subdomains, first action, replay, sitemap.",
    when: "The day before you share it.",
  },
];

export const GUIDES_LEDE =
  "The ladder is the map. These are the walk-throughs, in the order you would actually do them.";
