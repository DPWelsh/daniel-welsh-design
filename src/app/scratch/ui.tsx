import Image from "next/image";
import { type Book, bookLink } from "./library";

/* Flipped from ink-ground to paper-ground for danielwelsh.design.
 *
 * The names are the labs ones on purpose: 29 files import them, so keeping
 * the API identical is what let the tutorials come across unedited. Read
 * PAPER as "the text colour" — it was light-on-dark, it is now dark-on-light,
 * and every consumer just asks for the foreground.
 *
 * The site is near-monochrome with one red. So the blue that used to carry
 * interactive states becomes the same brick red, and ENERGY becomes a
 * lighter tint of it rather than a second hue competing for attention. */
export const PAPER = "#1f211e";
export const DIM = "rgba(31,33,30,0.72)";
export const FAINT = "rgba(31,33,30,0.52)";
export const ENERGY = "#c2685c";
export const ENERGY_DEEP = "#7d2a23";
export const PROMPT = "#a43e35";
export const INDIGO = "#1d2340";
export const RULE = "rgba(31,33,30,0.18)";
export const RULE_SOFT = "rgba(31,33,30,0.11)";

/* Acid Grotesk Light leads, at 300, matching the hero. Raptor is the DW mark
 * and nothing else. Acid ships one weight, so the weight is baked in here and
 * the font-black classes the labs pages carried are stripped — a synthesised
 * bold is exactly what the brand kit bans. */
export const serif = "font-[family-name:'Acid_Grotesk',var(--font-display)] font-[300]";
export const mono = "font-[family-name:var(--font-mono)]";

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function Kicker({
  children,
  color = PROMPT,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className={`${mono} text-[11px] font-semibold uppercase tracking-[0.3em]`}
      style={{ color }}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  part,
  title,
  lede,
  color,
}: {
  part: string;
  title: string;
  lede?: string;
  color?: string;
}) {
  return (
    <header className="space-y-4 border-t pt-6" style={{ borderColor: RULE }}>
      <Kicker color={color}>{part}</Kicker>
      <h2
        className={`${serif} text-3xl leading-tight sm:text-4xl`}
        style={{ color: PAPER }}
      >
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
          {lede}
        </p>
      )}
    </header>
  );
}

export function BookPlate({ book, size }: { book: Book; size: "lg" | "sm" }) {
  const width = size === "lg" ? 128 : 104;
  return (
    <a
      href={bookLink(book)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block shrink-0 transition-transform duration-300 hover:-translate-y-1.5 ${
        size === "sm" ? "-ml-8 rotate-[4deg] self-end sm:-ml-10" : "z-10"
      }`}
      style={{ width }}
      title={`${book.title}. ${book.author}`}
    >
      <Image
        src={book.cover}
        alt={`Cover of ${book.title} by ${book.author}`}
        className="h-auto w-full border border-white/10 shadow-[0_18px_35px_-12px_rgba(0,0,0,0.8)]"
        sizes="128px"
        placeholder="blur"
      />
    </a>
  );
}
