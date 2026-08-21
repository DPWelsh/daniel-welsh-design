import Image from "next/image";
import { BOOKS, VIDEOS, bookLink, videoLink, videoThumb } from "./library";
import {
  DIM,
  FAINT,
  PAPER,
  PROMPT,
  RULE_SOFT,
  SectionHead,
  mono,
  serif,
} from "./ui";

export function LibraryShelf() {
  return (
    <section id="library" className="mt-20 scroll-mt-10">
      <SectionHead
        part="Part IV. The library"
        title="Twelve books, in build order"
        lede="Concepts attributed, never excerpted. These are the originals. Read one per stage; the companion when the stage bites you. Covers link to Open Library."
      />

      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {BOOKS.map((book) => (
          <li key={book.slug} className="group flex flex-col">
            <a
              href={bookLink(book)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[190px] w-full max-w-[150px] items-end transition-transform duration-300 group-hover:-translate-y-1.5 sm:h-[210px]"
            >
              <Image
                src={book.cover}
                alt={`Cover of ${book.title} by ${book.author}`}
                className="h-auto max-h-full w-auto border border-white/10 shadow-[0_18px_35px_-12px_rgba(0,0,0,0.8)]"
                sizes="(max-width: 640px) 40vw, 150px"
                placeholder="blur"
              />
            </a>
            <div
              className="mt-0 h-px w-full max-w-[150px]"
              style={{ background: "rgba(31,33,30,0.10)" }}
            />
            <p
              className={`${mono} mt-3 text-[9px] font-bold uppercase tracking-[0.2em]`}
              style={{ color: book.role === "primary" ? PROMPT : FAINT }}
            >
              Stage {book.stage} · {book.role}
            </p>
            <h3
              className={`${serif} mt-1 text-[15px] leading-snug`}
              style={{ color: PAPER }}
            >
              {book.title}
            </h3>
            <p className={`${mono} mt-0.5 text-[10px]`} style={{ color: FAINT }}>
              {book.author}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DIM }}>
              {book.why}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Watchlist() {
  return (
    <section id="watchlist" className="mt-20 scroll-mt-10">
      <SectionHead
        part="Part V. The watchlist"
        title="Watch these before you prompt"
        lede="Every link verified. The 100-second ones cost you five minutes total. The talks are for the stage you're standing in. Not homework, ammunition."
      />

      <p
        className={`${mono} mt-8 text-[10px] font-bold uppercase tracking-[0.25em]`}
        style={{ color: PROMPT }}
      >
        Start here. Under five minutes total
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {VIDEOS.filter((v) => v.kind === "quick").map((v) => (
          <a
            key={v.id}
            href={videoLink(v)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoThumb(v)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1 p-4">
              <p
                className={`${mono} text-[9px] font-bold uppercase tracking-[0.2em]`}
                style={{ color: PROMPT }}
              >
                {v.tag}
              </p>
              <h3 className="text-[14px] font-semibold leading-snug" style={{ color: PAPER }}>
                {v.title}
              </h3>
              <p className={`${mono} text-[10px]`} style={{ color: FAINT }}>
                {v.channel} ↗
              </p>
            </div>
          </a>
        ))}
      </div>

      <p
        className={`${mono} mt-10 text-[10px] font-bold uppercase tracking-[0.25em]`}
        style={{ color: FAINT }}
      >
        The full talks. One per stage, when you&apos;re in it
      </p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
        {VIDEOS.filter((v) => v.kind === "talk").map((v) => (
          <li key={v.id} className="border-t" style={{ borderColor: RULE_SOFT }}>
            <a
              href={videoLink(v)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-4"
            >
              <div className="relative aspect-video w-24 shrink-0 overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={videoThumb(v)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`${mono} text-[9px] font-bold uppercase tracking-[0.18em]`}
                  style={{ color: PROMPT }}
                >
                  {v.tag}
                </p>
                <h3
                  className="line-clamp-2 text-[14px] font-semibold leading-snug group-hover:underline"
                  style={{ color: PAPER }}
                >
                  {v.title}
                </h3>
                <p className={`${mono} truncate text-[10px]`} style={{ color: FAINT }}>
                  {v.channel} ↗
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
