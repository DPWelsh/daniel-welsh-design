import { supabase } from "./supabase";

const HOURLY_LIMIT = 30;
const DAILY_LIMIT = 100;

interface RateLimitResult {
  allowed: boolean;
  error?: string;
  remaining?: { hourly: number; daily: number };
}

export async function checkRateLimit(
  ipAddress: string
): Promise<RateLimitResult> {
  // Skip rate limiting in development
  if (process.env.NODE_ENV === "development") {
    return { allowed: true, remaining: { hourly: HOURLY_LIMIT, daily: DAILY_LIMIT } };
  }

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Check hourly limit
  const { data: hourlyData } = await supabase
    .from("rate_limits")
    .select("count, window_start")
    .eq("ip_address", ipAddress)
    .eq("window", "hourly")
    .gte("window_start", oneHourAgo.toISOString())
    .single();

  const hourlyCount = hourlyData?.count ?? 0;

  // Check daily limit
  const { data: dailyData } = await supabase
    .from("rate_limits")
    .select("count, window_start")
    .eq("ip_address", ipAddress)
    .eq("window", "daily")
    .gte("window_start", oneDayAgo.toISOString())
    .single();

  const dailyCount = dailyData?.count ?? 0;

  if (hourlyCount >= HOURLY_LIMIT) {
    return {
      allowed: false,
      error: "Rate limit exceeded. Max 10 analyses per hour. Please try again later.",
    };
  }

  if (dailyCount >= DAILY_LIMIT) {
    return {
      allowed: false,
      error: "Daily limit exceeded. Max 30 analyses per day. Please try again tomorrow.",
    };
  }

  return {
    allowed: true,
    remaining: {
      hourly: HOURLY_LIMIT - hourlyCount,
      daily: DAILY_LIMIT - dailyCount,
    },
  };
}

export async function incrementRateLimit(ipAddress: string): Promise<void> {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Upsert hourly counter
  const { data: hourlyData } = await supabase
    .from("rate_limits")
    .select("count, window_start")
    .eq("ip_address", ipAddress)
    .eq("window", "hourly")
    .gte("window_start", oneHourAgo.toISOString())
    .single();

  if (hourlyData) {
    await supabase
      .from("rate_limits")
      .update({ count: hourlyData.count + 1 })
      .eq("ip_address", ipAddress)
      .eq("window", "hourly");
  } else {
    await supabase.from("rate_limits").upsert({
      ip_address: ipAddress,
      window: "hourly",
      count: 1,
      window_start: now.toISOString(),
    });
  }

  // Upsert daily counter
  const { data: dailyData } = await supabase
    .from("rate_limits")
    .select("count, window_start")
    .eq("ip_address", ipAddress)
    .eq("window", "daily")
    .gte("window_start", oneDayAgo.toISOString())
    .single();

  if (dailyData) {
    await supabase
      .from("rate_limits")
      .update({ count: dailyData.count + 1 })
      .eq("ip_address", ipAddress)
      .eq("window", "daily");
  } else {
    await supabase.from("rate_limits").upsert({
      ip_address: ipAddress,
      window: "daily",
      count: 1,
      window_start: now.toISOString(),
    });
  }
}
