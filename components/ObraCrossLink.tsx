import { siteConfig } from "@/lib/site";

/**
 * Cross-link block to the sister site obra.com.py (heavy construction:
 * house builds, pools, structural roofs, masonry, durlock/cielorrasos and
 * metal pergolas / portones de hierro). This site stays carpentry-only.
 */
export function ObraCrossLink({ compact = false }: { compact?: boolean }) {
  const obraDomain = siteConfig.obraUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  if (compact) {
    return (
      <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
        ¿Buscás obra más grande (casas, piscinas, techos estructurales, durlock,
        herrería)?{" "}
        <a
          href={siteConfig.obraUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{ color: "var(--green)", textDecoration: "underline" }}
        >
          {obraDomain}
        </a>
      </p>
    );
  }

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        background: "var(--tint)",
        border: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div className="card-title" style={{ fontSize: 18 }}>
          ¿Buscás obra más grande?
        </div>
        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            marginTop: 6,
            marginBottom: 0,
            lineHeight: 1.5,
          }}
        >
          Acá hacemos carpintería y ebanistería. Para construcción de casas,
          piscinas, techos estructurales, mampostería, durlock/cielorrasos y
          pérgolas o portones de hierro, te ayuda nuestro sitio hermano.
        </p>
      </div>
      <a
        href={siteConfig.obraUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost"
      >
        Ir a {obraDomain}
      </a>
    </div>
  );
}
