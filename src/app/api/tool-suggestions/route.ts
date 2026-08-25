import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Missing one? Add it here." from /saas-calc.
 *
 * Nothing submitted here reaches the calculator automatically. Rows land as
 * `new` and get priced against the vendor page by hand, because the whole
 * promise of that page is that every number on it was checked. An open write
 * path that could set a price would end that promise on day one.
 *
 * A honeypot plus length caps is the right weight for a target this cheap.
 */
const cap = (v: unknown, n: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, n) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tool_name, url, job, price_note, email, source, website } = body as Record<
      string,
      string | undefined
    >;

    // Honeypot. A real person never fills a field they cannot see.
    if (website) return NextResponse.json({ success: true });

    const name = cap(tool_name, 80);
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Tool name is required" },
        { status: 400 },
      );
    }

    const cleanEmail = cap(email, 160);
    if (cleanEmail && !EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "That email does not look right" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("tool_suggestions").insert({
      tool_name: name,
      url: cap(url, 300),
      job: cap(job, 80),
      price_note: cap(price_note, 120),
      email: cleanEmail,
      source: cap(source, 40) ?? "saas-calc",
    });

    if (error) {
      console.error("tool_suggestions insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save that" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
