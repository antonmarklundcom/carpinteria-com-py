// Central site configuration, sourced from env with safe fallbacks so the
// app builds and runs even when optional vars are unset.

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://carpinteria.com.py",
  brand: process.env.NEXT_PUBLIC_BRAND_NAME || "Carpintería Paraguay",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /[^0-9]/g,
    "",
  ),
  zone: process.env.NEXT_PUBLIC_ZONE || "Gran Asunción",
};

export const LEAD_PITCH =
  "Mandanos la medida + una foto del espacio y te pasamos presupuesto sin compromiso.";

/**
 * Replace the [Zona] token used in H1s and copy with the configured zone.
 */
export function withZone(text: string): string {
  return text.replaceAll("[Zona]", siteConfig.zone);
}

/**
 * Build a prefilled wa.me deep link. Falls back to a bare wa.me link when no
 * number is configured (still valid, just opens WhatsApp without a target).
 */
export function buildWaUrl(opts?: {
  nombre?: string;
  tipo?: string;
  mensaje?: string;
  context?: string;
}): string {
  const { nombre, tipo, mensaje, context } = opts || {};
  const lines: string[] = [];
  lines.push("¡Hola! Quiero pedir un presupuesto sin compromiso.");
  if (context) lines.push(`Servicio: ${context}`);
  if (nombre) lines.push(`Nombre: ${nombre}`);
  if (tipo) lines.push(`Tipo de trabajo: ${tipo}`);
  if (mensaje) lines.push(`Detalle / medida: ${mensaje}`);
  const text = encodeURIComponent(lines.join("\n"));
  const num = siteConfig.whatsappNumber;
  return num ? `https://wa.me/${num}?text=${text}` : `https://wa.me/?text=${text}`;
}
