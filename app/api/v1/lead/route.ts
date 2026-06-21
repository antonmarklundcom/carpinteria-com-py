import { NextResponse } from "next/server";
import { leadSchema, processLead } from "@/lib/leads";
import { buildWaUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    // Malformed body — still hand back a usable (empty) WhatsApp link so the
    // client can proceed. Never block the user.
    return NextResponse.json(
      { ok: true, waUrl: buildWaUrl() },
      { status: 200 },
    );
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    // Validation failed: log for diagnostics, but degrade gracefully.
    console.warn("[lead] invalid payload:", parsed.error.flatten().fieldErrors);
    return NextResponse.json(
      { ok: true, waUrl: buildWaUrl() },
      { status: 200 },
    );
  }

  const result = await processLead(parsed.data);
  return NextResponse.json(result, { status: 200 });
}
