import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getListedServiceMeta } from "@/lib/content";

export function Footer() {
  const domain = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const services = getListedServiceMeta().slice(0, 8);
  const zones = [
    "Asunción",
    "Luque",
    "Capiatá",
    "San Lorenzo",
    "Fernando de la Mora",
    "Mariano R. Alonso",
  ];

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
              maxWidth: 280,
              lineHeight: 1.55,
            }}
          >
            Construimos en madera, a tu medida — en tu terreno. Pedí tu
            presupuesto sin compromiso.
          </p>
        </div>

        <div>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Servicios</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {services.map((s) => (
              <li key={s.slug} style={{ marginBottom: 7 }}>
                <Link href={`/${s.slug}`} className="footer-link">
                  {s.h1.replace(/\s*en \[Zona\].*/i, "").replace("[Zona]", siteConfig.zone)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Zonas</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {zones.map((z) => (
              <li
                key={z}
                style={{ marginBottom: 7, fontSize: 14, color: "var(--muted)" }}
              >
                {z}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16 }}>
            <Link href="/quienes-somos" className="footer-link">
              Quiénes somos
            </Link>
            <span style={{ color: "var(--faint)", margin: "0 8px" }}>·</span>
            <Link href="/contacto" className="footer-link">
              Contacto
            </Link>
          </div>
        </div>
      </div>
      <div
        className="shell"
        style={{
          paddingBottom: 28,
          fontSize: 12,
          color: "var(--faint)",
        }}
      >
        © {new Date().getFullYear()} {siteConfig.brand}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
