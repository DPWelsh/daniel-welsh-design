"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import "./hero.css";
import { initHero } from "./hero-runtime";

/** 60 frames per sequence, doubled: a base pass and a red pass the cursor
 *  reveals through. Same numbers the hand-built page used. */
const FRAMES = Array.from({ length: 60 }, (_, i) => String(i).padStart(3, "0"));

function Sequence({
  kind,
  dir,
  version,
  tone,
}: {
  kind: "walk" | "laptop";
  dir: string;
  version: string;
  tone: "base" | "red";
}) {
  return (
    <div
      className={`${kind === "walk" ? "walker" : "laptop"}-sequence ${kind === "walk" ? "walker" : "laptop"}-${tone}-sequence`}
      aria-hidden={tone === "red" ? true : undefined}
    >
      {FRAMES.map((n, i) => (
        <img
          key={n}
          className={`${kind}-frame${i === 0 ? " is-active" : ""}`}
          data-frame={i}
          src={`/site-assets/${dir}/frame-${n}.svg?v=${version}`}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      ))}
    </div>
  );
}

export default function Home() {
  useEffect(() => initHero(), []);

  return (
    <>
      <main className="hero">
        <div
          className="walker-art"
          role="img"
          aria-label="Daniel walking, rendered as a chronological sixty-frame ASCII animation"
        >
          <Sequence kind="walk" dir="higgsfield-b2-ascii-walk-with-hat" version="3" tone="base" />
          <Sequence kind="walk" dir="higgsfield-b2-ascii-walk-with-hat" version="3" tone="red" />
        </div>

        <div
          className="billie-art"
          role="img"
          aria-label="Billie, a Kintamani dog, walking beside Daniel in ASCII"
        >
          <div className="billie-sequence billie-base-sequence" />
          <div className="billie-sequence billie-red-sequence" aria-hidden="true" />
        </div>

        <div
          className="laptop-art"
          role="img"
          aria-label="A floating ASCII laptop spinning, closing and reopening"
        >
          <Sequence kind="laptop" dir="higgsfield-laptop-ascii" version="2" tone="base" />
          <Sequence kind="laptop" dir="higgsfield-laptop-ascii" version="2" tone="red" />
        </div>

        <section className="copy">
          <p className="eyebrow">Daniel Welsh - Routiq.</p>
          <h1 aria-label="I build apps, systems, websites, and things.">
            <span className="build-line">I build</span>
            <span className="typed-line" aria-hidden="true">
              <span id="typed-word">things.</span>
              <span className="type-cursor" />
            </span>
          </h1>
          <p className="intro">And I explain how they work.</p>
        </section>

        <button
          className="control-button menu-toggle"
          id="menu-toggle"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="site-menu"
        >
          Menu
        </button>
      </main>

      <dialog className="site-menu" id="site-menu" aria-labelledby="site-menu-title">
        <header className="site-menu__header">
          <p className="site-menu__title" id="site-menu-title">
            Daniel Welsh · Routiq
          </p>
          <button className="menu-close" id="menu-close" type="button" aria-label="Close menu">
            Close
          </button>
        </header>

        <nav className="site-menu__nav" aria-label="Primary navigation">
          <Link className="site-menu__link" href="/journal/how-we-made-this-website">
            <small aria-hidden="true">01</small>
            <span>Blog</span>
          </Link>
          {/* No longer "Soon". The tutorials are here. */}
          <Link className="site-menu__link" href="/tutorials">
            <small aria-hidden="true">02</small>
            <span>Tutorials</span>
          </Link>
          <a className="site-menu__link" href="https://discord.gg/tz6jQDvmrh">
            <small aria-hidden="true">03</small>
            <span>Discord</span>
          </a>
        </nav>

        <button
          className="control-button motion-toggle"
          id="motion-toggle"
          type="button"
          aria-pressed="true"
        >
          Pause motion
        </button>
      </dialog>
    </>
  );
}
