import { NextResponse } from "next/server";
import { runCcusage } from "@/lib/ccusage";
import type { SessionResponse } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await runCcusage<SessionResponse>("session", []);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
