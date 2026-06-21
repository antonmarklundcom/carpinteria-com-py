// Google Sheets webhook logger (e.g. an Apps Script web app). Never throws —
// failures are swallowed so the lead flow never blocks the user.

import type { LeadPayload } from "./leads";
import { postWithRetry } from "./http";

export async function logToSheets(lead: LeadPayload): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.info("[sheets] SHEETS_WEBHOOK_URL not set — skipping Sheets log.");
    return false;
  }
  try {
    await postWithRetry(url, {
      timestamp: new Date().toISOString(),
      nombre: lead.nombre,
      whatsapp: lead.whatsapp,
      tipo: lead.tipo,
      mensaje: lead.mensaje || "",
      source: lead.source,
      page: lead.page || "",
    });
    return true;
  } catch (err) {
    console.error("[sheets] failed to log lead:", (err as Error).message);
    return false;
  }
}
