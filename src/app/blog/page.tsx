import type { Metadata } from "next";
import Link from "next/link";
import { Masthead, PageFooter } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Build notes from the things I make: what the problem was, what it took, and what it actually cost.",
  alternates: { canonical: "https://danielwelsh.design/blog" },
};

/* The posts themselves are still hand-built static HTML under public/blog,
 * each with its own art and typography. This index only needs what a reader
 * scans, so a post is a row here and a folder there. Adding a post means a
 * folder plus an entry, until there are enough of them to earn a CMS. */
type Post = {
  slug: string;
  n: string;
  title: string;
  blurb: string;
  date: string;
  read: string;
};

const POSTS: Post[] = [
  {
    slug: "how-we-made-this-website",
    n: "001",
    title: "How we made this website walk",
    blurb:
      "A portrait became an ASCII character, Higgsfield taught that character to walk, and the resulting video became sixty new text drawings.",
    date: "21 Aug 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="grain relative min-h-screen">
      <Masthead section="Blog" />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <p className="label" style={{ color: "var(--accent)" }}>
          Build notes
        </p>
        <h1
          className="display rise mt-5 text-[clamp(52px,8vw,116px)]"
          style={{ maxWidth: "13ch" }}
        >
          How it got
          <br />
          <span style={{ color: "var(--accent)" }}>made.</span>
        </h1>
        <p
          className="rise mt-8 max-w-[46ch] text-[clamp(17px,1.5vw,21px)] leading-[1.35]"
          style={{ color: "var(--muted)", animationDelay: "0.1s" }}
        >
          The long version of things on this site: what the problem was, what
          it took to solve, and what it cost.
        </p>

        <ul className="mt-16 border-t" style={{ borderColor: "var(--rule)" }}>
          {POSTS.map((p) => (
            <li key={p.slug} className="border-b" style={{ borderColor: "var(--rule)" }}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-x-10 gap-y-4 py-10 sm:grid-cols-[64px_1fr_260px]"
              >
                <span className="label pt-2" style={{ color: "var(--accent)" }}>
                  {p.n}
                </span>

                <div>
                  <p className="display text-[clamp(30px,3.6vw,50px)] transition-opacity group-hover:opacity-70">
                    {p.title}
                  </p>
                  <p
                    className="mt-4 max-w-[54ch] text-[15px] leading-[1.45]"
                    style={{ color: "var(--muted)" }}
                  >
                    {p.blurb}
                  </p>
                </div>

                <div className="sm:pt-3">
                  <p className="label" style={{ color: "var(--muted)" }}>
                    {p.date}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.4]" style={{ color: "var(--ink)" }}>
                    {p.read}
                  </p>
                  <span
                    className="label mt-4 inline-block border-b pb-0.5 transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
                  >
                    Read it →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <PageFooter />
    </div>
  );
}
