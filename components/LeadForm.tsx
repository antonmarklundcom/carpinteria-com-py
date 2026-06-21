"use client";

import { useState } from "react";
import { TIPOS } from "@/lib/leads";
import { WhatsAppIcon } from "./icons";

const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
  /[^0-9]/g,
  "",
);

/** Client-side mirror of lib/site buildWaUrl so we can redirect immediately. */
function buildWaUrl(opts: {
  nombre?: string;
  tipo?: string;
  mensaje?: string;
  context?: string;
}): string {
  const lines = ["¡Hola! Quiero pedir un presupuesto sin compromiso."];
  if (opts.context) lines.push(`Servicio: ${opts.context}`);
  if (opts.nombre) lines.push(`Nombre: ${opts.nombre}`);
  if (opts.tipo) lines.push(`Tipo de trabajo: ${opts.tipo}`);
  if (opts.mensaje) lines.push(`Detalle / medida: ${opts.mensaje}`);
  const text = encodeURIComponent(lines.join("\n"));
  return WA_NUMBER
    ? `https://wa.me/${WA_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function LeadForm({
  source = "home",
  eyebrow = "Presupuesto sin compromiso",
  title = "Contanos tu proyecto",
  defaultTipo,
}: {
  source?: string;
  eyebrow?: string;
  title?: string;
  defaultTipo?: (typeof TIPOS)[number];
}) {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo, setTipo] = useState<string>(defaultTipo || "");
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !whatsapp.trim() || !tipo) {
      setError("Completá tu nombre, WhatsApp y qué querés construir.");
      return;
    }

    setSubmitting(true);

    const payload = {
      nombre: nombre.trim(),
      whatsapp: whatsapp.trim(),
      tipo,
      mensaje: mensaje.trim(),
      source,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };

    const waUrl = buildWaUrl({
      nombre: payload.nombre,
      tipo: payload.tipo,
      mensaje: payload.mensaje,
      context: source,
    });

    // Leave-page-safe logging: prefer sendBeacon, fall back to keepalive fetch.
    try {
      const body = JSON.stringify(payload);
      let sent = false;
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        sent = navigator.sendBeacon("/api/v1/lead", blob);
      }
      if (!sent) {
        void fetch("/api/v1/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Never block the user — proceed to WhatsApp regardless.
    }

    window.location.href = waUrl;
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="eyebrow" style={{ marginBottom: 10 }}>
        {eyebrow}
      </div>
      <div
        style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 13,
          marginTop: 22,
        }}
      >
        <div>
          <label className="field-label" htmlFor={`${source}-nombre`}>
            Tu nombre
          </label>
          <input
            id={`${source}-nombre`}
            className="field"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-whatsapp`}>
            Tu WhatsApp
          </label>
          <input
            id={`${source}-whatsapp`}
            className="field"
            placeholder="Ej. 0981 123 456"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-tipo`}>
            ¿Qué querés construir?
          </label>
          <select
            id={`${source}-tipo`}
            className="field"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ appearance: "none" }}
          >
            <option value="">Elegí una opción…</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-mensaje`}>
            Medida o detalle (opcional)
          </label>
          <textarea
            id={`${source}-mensaje`}
            className="field"
            placeholder="Contanos la medida o lo que tenés en mente"
            rows={2}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
      </div>

      {error && (
        <p
          style={{
            color: "#b00020",
            fontSize: 13,
            margin: "12px 0 0",
          }}
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-green"
        style={{ width: "100%", marginTop: 18, padding: 17 }}
        disabled={submitting}
      >
        <WhatsAppIcon />
        {submitting ? "Abriendo WhatsApp…" : "Pedí tu presupuesto gratis"}
      </button>

      <p
        style={{
          fontSize: 12,
          color: "var(--faint)",
          textAlign: "center",
          marginTop: 12,
          marginBottom: 0,
        }}
      >
        Te respondemos hoy mismo · Mandanos también la medida y una foto.
      </p>
    </form>
  );
}
