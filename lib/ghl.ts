// GoHighLevel webhook logger. Never throws to the caller — failures are
// swallowed and reported via the returned boolean so the lead flow never blocks.

import type { LeadPayload } from "./leads";
import { postWithRetry } from "./http";

export async function logToGhl(lead: LeadPayload): Promise<boolean> {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.info("[ghl] GHL_WEBHOOK_URL not set — skipping GHL log.");
    return false;
  }
  try {
    await postWithRetry(url, {
      first_name: lead.nombre,
      phone: lead.whatsapp,
      tipo: lead.tipo,
      message: lead.mensaje || "",
      source: lead.source,
      page: lead.page || "",
    });
    return true;
  } catch (err) {
    console.error("[ghl] failed to log lead:", (err as Error).message);
    return false;
  }
}
