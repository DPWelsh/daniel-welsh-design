import type { StaticImageData } from "next/image";

import pragmaticProgrammer from "../../../public/books/pragmatic-programmer.jpg";
import mythicalManMonth from "../../../public/books/mythical-man-month.jpg";
import continuousDelivery from "../../../public/books/continuous-delivery.jpg";
import accelerate from "../../../public/books/accelerate.jpg";
import cleanArchitecture from "../../../public/books/clean-architecture.jpg";
import domainDrivenDesign from "../../../public/books/domain-driven-design.jpg";
import ddia from "../../../public/books/ddia.jpg";
import goos from "../../../public/books/goos.jpg";
import dontMakeMeThink from "../../../public/books/dont-make-me-think.jpg";
import leanStartup from "../../../public/books/lean-startup.jpg";
import refactoring from "../../../public/books/refactoring.jpg";
import buildingMicroservices from "../../../public/books/building-microservices.jpg";

export interface Book {
  slug: string;
  title: string;
  author: string;
  stage: number;
  role: "primary" | "companion";
  why: string;
  isbn: string;
  cover: StaticImageData;
}

export const BOOKS: Book[] = [
  {
    slug: "pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    stage: 1,
    role: "primary",
    why: "The mindset the whole plan borrows — tracer bullets, DRY, fix broken windows before they spread.",
    isbn: "9780135957059",
    cover: pragmaticProgrammer,
  },
  {
    slug: "mythical-man-month",
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    stage: 1,
    role: "companion",
    why: "Why one page from one mind beats ten from a committee — and why adding people (or agents) to a late project makes it later.",
    isbn: "9780201835953",
    cover: mythicalManMonth,
  },
  {
    slug: "continuous-delivery",
    title: "Continuous Delivery",
    author: "Jez Humble & David Farley",
    stage: 2,
    role: "primary",
    why: "The case for gates on every push — releases so boring they're a non-event.",
    isbn: "9780321601919",
    cover: continuousDelivery,
  },
  {
    slug: "accelerate",
    title: "Accelerate",
    author: "Forsgren, Humble & Kim",
    stage: 2,
    role: "companion",
    why: "The data behind the gates — small batches and fast feedback beat heroics, measurably.",
    isbn: "9781942788331",
    cover: accelerate,
  },
  {
    slug: "clean-architecture",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    stage: 3,
    role: "primary",
    why: "Dependencies point inward; vendors stay at the edge where they can be swapped.",
    isbn: "9780134494166",
    cover: cleanArchitecture,
  },
  {
    slug: "domain-driven-design",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    stage: 3,
    role: "companion",
    why: "One shared language per noun, so the code matches the business it runs.",
    isbn: "9780321125217",
    cover: domainDrivenDesign,
  },
  {
    slug: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    stage: 4,
    role: "primary",
    why: "What actually happens to your data under failure — and why 'it sent twice' is a design problem.",
    isbn: "9781449373320",
    cover: ddia,
  },
  {
    slug: "goos",
    title: "Growing Object-Oriented Software, Guided by Tests",
    author: "Steve Freeman & Nat Pryce",
    stage: 4,
    role: "companion",
    why: "The walking skeleton — one journey end-to-end first, features second.",
    isbn: "9780321503626",
    cover: goos,
  },
  {
    slug: "dont-make-me-think",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    stage: 5,
    role: "primary",
    why: "Usability you can apply in an afternoon — including the test where a stranger uses your app while you stay silent.",
    isbn: "9780321965516",
    cover: dontMakeMeThink,
  },
  {
    slug: "lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    stage: 5,
    role: "companion",
    why: "Measure what people do, not what they say — the difference between shipped and used.",
    isbn: "9780307887894",
    cover: leanStartup,
  },
  {
    slug: "refactoring",
    title: "Refactoring",
    author: "Martin Fowler",
    stage: 6,
    role: "primary",
    why: "How to change code without breaking it — the strangler fig migration lives here.",
    isbn: "9780134757599",
    cover: refactoring,
  },
  {
    slug: "building-microservices",
    title: "Building Microservices",
    author: "Sam Newman",
    stage: 6,
    role: "companion",
    why: "When to split and when not to — plus the parallel-run migration pattern.",
    isbn: "9781492034025",
    cover: buildingMicroservices,
  },
];

export function bookLink(book: Book): string {
  return `https://openlibrary.org/isbn/${book.isbn}`;
}

export interface Video {
  id: string;
  title: string;
  channel: string;
  tag: string;
  kind: "quick" | "talk";
}

/* Every ID verified against YouTube oEmbed on 2026-08-01 — title and channel
   are the real ones, so dead or renamed links surface as a diff here. */
export const VIDEOS: Video[] = [
  {
    id: "hwP7WQkmECE",
    title: "Git Explained in 100 Seconds",
    channel: "Fireship",
    tag: "Mistake 1 · Git",
    kind: "quick",
  },
  {
    id: "scEDHsr3APg",
    title: "DevOps CI/CD Explained in 100 Seconds",
    channel: "Fireship",
    tag: "Stage 2 · Gates",
    kind: "quick",
  },
  {
    id: "zBZgdTb-dns",
    title: "Supabase in 100 Seconds",
    channel: "Fireship",
    tag: "Mistake 4 · The database",
    kind: "quick",
  },
  {
    id: "Lue8K2jqfKk",
    title: "Claude Code & the Evolution of Agentic Coding",
    channel: "AI Engineer — Boris Cherny",
    tag: "The tool itself",
    kind: "talk",
  },
  {
    id: "RGOj5yH7evk",
    title: "Git and GitHub for Beginners — Crash Course",
    channel: "freeCodeCamp",
    tag: "Mistake 1 · Git",
    kind: "talk",
  },
  {
    id: "2sjqTHE0zok",
    title: "Version Control (Git) — Lecture 6",
    channel: "MIT Missing Semester",
    tag: "Mistake 1 · deeper",
    kind: "talk",
  },
  {
    id: "Ow_Uzedfohk",
    title: "Row Level Security with Supabase — Step by Step",
    channel: "Supabase (official)",
    tag: "Mistake 4 · RLS",
    kind: "talk",
  },
  {
    id: "o_TH-Y78tt4",
    title: "The Principles of Clean Architecture",
    channel: "Uncle Bob Martin",
    tag: "Stage 3 · Boundaries",
    kind: "talk",
  },
  {
    id: "fU9hR3kiOK0",
    title: "Turning the Database Inside Out",
    channel: "Martin Kleppmann — Strange Loop",
    tag: "Stage 4 · Data",
    kind: "talk",
  },
  {
    id: "VfRE0ah3NxE",
    title: "Practical Solutions to Common UI Design Problems",
    channel: "Steve Schoger — Laracon",
    tag: "Mistake 5 · Design",
    kind: "talk",
  },
  {
    id: "fEvKo90qBns",
    title: "The Lean Startup",
    channel: "Eric Ries — Talks at Google",
    tag: "Stage 5 · Measure",
    kind: "talk",
  },
];

export function videoLink(v: Video): string {
  return `https://www.youtube.com/watch?v=${v.id}`;
}

export function videoThumb(v: Video): string {
  return `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
}
