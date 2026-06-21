// Lead orchestrator. zod-validates input, fans out to loggers in parallel
// (never blocking the user), and always returns a prefilled WhatsApp URL.

import { z } from "zod";
import { buildWaUrl } from "./site";
import { logToGhl } from "./ghl";
import { logToSheets } from "./sheets";

export const TIPOS = [
  "Quincho",
  "Casa",
  "Cocina",
  "Aberturas",
  "Deck o Pérgola",
  "Placar",
  "Otro",
] as const;

export const leadSchema = z.object({
  nombre: z.string().trim().min(1, "Tu nombre es obligatorio").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Pasanos un número de WhatsApp válido")
    .max(40),
  tipo: z.enum(TIPOS),
  mensaje: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().min(1).max(120).default("home"),
  page: z.string().trim().max(300).optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadPayload = z.output<typeof leadSchema>;

export interface LeadResult {
  ok: true;
  waUrl: string;
}

/**
 * Process a validated lead: fire-and-await the loggers with allSettled so a
 * failing/unset logger never affects the user. Always resolves with a waUrl.
 */
export async function processLead(lead: LeadPayload): Promise<LeadResult> {
  const waUrl = buildWaUrl({
    nombre: lead.nombre,
    tipo: lead.tipo,
    mensaje: lead.mensaje,
    context: lead.source,
  });

  const results = await Promise.allSettled([
    logToGhl(lead),
    logToSheets(lead),
  ]);

  results.forEach((r, i) => {
    const name = i === 0 ? "ghl" : "sheets";
    if (r.status === "rejected") {
      // Should not happen (loggers swallow), but stay defensive.
      console.error(`[leads] ${name} logger rejected:`, r.reason);
    }
  });

  return { ok: true, waUrl };
}
