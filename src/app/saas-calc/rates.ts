/* ── Currency ────────────────────────────────────────────────────────
   The board is priced in USD because that is how nearly every vendor on
   it bills. Everything else is a conversion done at display time.

   No npm package ships live rates: money.js and currency.js both do the
   arithmetic and expect you to hand them a rate table. So the rate table
   comes from a feed and the formatting comes from Intl, which is already
   in the runtime and knows every currency's symbol and decimal rules.

   Fetched on the server and revalidated daily, so a reader never waits
   on it and we never ship an API key to the browser. If the feed is
   down the page falls back to the table below and says so.

   PROSE RULE: no em dashes anywhere. */

export interface Rates {
  /** code → units per 1 USD */
  table: Record<string, number>;
  /** ISO date the feed was last updated, or null when we fell back */
  updated: string | null;
}

/** The dropdown. Kept to currencies a reader of this page plausibly pays in. */
export const CURRENCIES = [
  "USD", "AUD", "GBP", "EUR", "CAD", "NZD",
  "SGD", "HKD", "JPY", "CHF", "SEK", "INR",
  "AED", "ZAR", "BRL", "MXN", "PHP", "MYR",
] as const;

/** Mid-market, 16 Aug 2026. Only used when the feed cannot be reached. */
const FALLBACK: Record<string, number> = {
  USD: 1, AUD: 1.41, GBP: 0.74, EUR: 0.86, CAD: 1.37, NZD: 1.56,
  SGD: 1.28, HKD: 7.8, JPY: 147, CHF: 0.8, SEK: 9.5, INR: 87,
  AED: 3.67, ZAR: 17.6, BRL: 5.4, MXN: 18.6, PHP: 57, MYR: 4.2,
};

export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };
    if (data.result !== "success" || !data.rates?.AUD) throw new Error("bad payload");

    const table: Record<string, number> = { USD: 1 };
    for (const c of CURRENCIES) {
      const r = data.rates[c];
      if (typeof r === "number") table[c] = r;
    }
    const updated = data.time_last_update_utc
      ? new Date(data.time_last_update_utc).toISOString().slice(0, 10)
      : null;
    return { table, updated };
  } catch {
    return { table: FALLBACK, updated: null };
  }
}
