import Link from "next/link";
import { siteConfig, buildWaUrl } from "@/lib/site";
import { getListedServiceMeta, serviceNavLabel } from "@/lib/content";
import { getZonaNavLinks } from "@/lib/nav";
import { ObraCrossLink } from "./ObraCrossLink";

export function Footer() {
  const domain = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const services = getListedServiceMeta();
  const zonas = getZonaNavLinks();
  const waHref = buildWaUrl({ context: "Footer" });

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 0 }}>
      <div
        className="shell footer-grid"
        style={{ padding: "44px 22px", display: "grid", gap: 36 }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{siteConfig.brand}</div>
          <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 4 }}>
            {domain}
          </div>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              marginTop: 14,
              maxWidth: 300,
              lineHeight: 1.55,
            }}
          >
            Carpintería y ebanistería a medida, en madera y melamina. Un equipo
            con 20 años de experiencia. Trabajamos aberturas en madera — no
            hacemos aluminio ni PVC.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: "var(--green)", fontWeight: 700 }}
            >
              WhatsApp
            </Link>
            <span style={{ color: "var(--faint)", margin: "0 8px" }}>·</span>
            <Link href="/quienes-somos" className="footer-link">
              Quiénes Somos
            </Link>
            <span style={{ color: "var(--faint)", margin: "0 8px" }}>·</span>
            <Link href="/contacto" className="footer-link">
              Contacto
            </Link>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Servicios</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {services.map((s) => (
              <li key={s.slug} style={{ marginBottom: 7 }}>
                <Link href={`/${s.slug}`} className="footer-link">
                  {serviceNavLabel(s)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Zonas</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {zonas.map((z) => (
              <li key={z.href} style={{ marginBottom: 7 }}>
                <Link href={z.href} className="footer-link">
                  Carpintería en {z.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell" style={{ paddingBottom: 28 }}>
        <ObraCrossLink compact />
        <div
          style={{
            fontSize: 12,
            color: "var(--faint)",
            marginTop: 20,
          }}
        >
          © {new Date().getFullYear()} {siteConfig.brand}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
