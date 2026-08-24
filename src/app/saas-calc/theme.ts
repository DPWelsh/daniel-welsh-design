/* The calculator's palette and money formatting, shared by the board, the
   logo chip and the detail card rather than redeclared in each.
   These are the Routiq v2 values, where Clay replaced the old Energy red. */

export const CLOUD = "#ededeb";
export const CORE = "#1a1c12";
export const CLAY = "#C98B7A";
export const PROMPT = "#7ba2e0";
export const DIM = "rgba(26,28,18,0.72)";
export const FAINT = "rgba(26,28,18,0.52)";
export const RULE = "rgba(26,28,18,0.18)";
export const RULE_SOFT = "rgba(26,28,18,0.10)";

/* One base currency for the whole board: USD, because that is how nearly
   every vendor on it actually bills. The handful that bill in AUD or euros
   (Xero, Cliniko, Hetzner) are stored as their USD equivalent and say so in
   their note, so the totals add up. Everything else is display only, at the
   day's rate. */
export const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export const money = (n: number, cur: string, rate: number) => {
  if (cur === "USD") return fmt(n);
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(n * rate);
  } catch {
    return fmt(n);
  }
};
