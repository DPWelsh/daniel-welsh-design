import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Writes into the same email_subscribers table labs uses, so the list stays
   in one place and `source` says which magnet earned the address.

   Source is validated by shape, not against an allowlist. Labs learned that
   the hard way twice: an allowlist silently dropped every signup from a page
   that forgot to register itself. Any short kebab/snake slug is valid. */
const SOURCE_RE = /^[a-z0-9][a-z0-9_-]{1,39}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body as { email?: string; source?: string };

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (!source || !SOURCE_RE.test(source)) {
      return NextResponse.json(
        { success: false, error: "Invalid source" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("email_subscribers")
      .upsert({ email, source }, { onConflict: "email" });

    if (error) {
      console.error("Supabase subscribe error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to subscribe" },
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
