import { createClient, SupabaseClient } from "@supabase/supabase-js";

/* Built on first use rather than at import time. A route that never touches
   Supabase should not fail to build because the key is absent, which is what
   a top-level createClient would do. The service role key is server only:
   never import this from a "use client" file. */
let _supabase: SupabaseClient | null = null;

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    if (!_supabase) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
      if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
      _supabase = createClient(url, key);
    }
    return Reflect.get(_supabase, prop, receiver);
  },
});
