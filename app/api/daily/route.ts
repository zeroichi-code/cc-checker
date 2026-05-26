import { NextResponse } from "next/server";
import { runCcusage } from "@/lib/ccusage";
import type { DailyResponse } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await runCcusage<DailyResponse>("daily", []);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
