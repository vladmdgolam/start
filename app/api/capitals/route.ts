import { NextResponse } from "next/server";

import { capitals } from "@/data/capitals";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ capitals });
}
