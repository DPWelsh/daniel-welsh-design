"use client";

import { useState } from "react";
import { type Option } from "./game-data";
import { mono } from "../scratch/ui";
import { DIM } from "./theme";

/** A vendor favicon, falling back to its initial when there is no domain or
 *  the fetch fails. Every row on the board draws one. */
export function Logo({ opt }: { opt: Option }) {
  const [broken, setBroken] = useState(false);

  if (!opt.domain || broken)
    return (
      <span
        className={`${mono} flex h-5 w-5 shrink-0 items-center justify-center text-[10px]`}
        style={{ backgroundColor: "rgba(26,28,18,0.08)", color: DIM }}
        aria-hidden
      >
        {opt.name[0]}
      </span>
    );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${opt.domain}&sz=64`}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      onError={() => setBroken(true)}
      className="h-5 w-5 shrink-0 rounded-[3px]"
    />
  );
}
