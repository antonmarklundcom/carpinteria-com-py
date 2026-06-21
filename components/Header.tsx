import Link from "next/link";
import { siteConfig, buildWaUrl } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function Header() {
  const domain = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const waHref = buildWaUrl({ context: "Header" });

  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between" style={{ height: 72 }}>
        <Link
          href="/"
          className="flex items-center gap-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--ink)",
              color: "var(--bg)",
              fontWeight: 800,
              fontSize: 15,
            }}
            aria-hidden="true"
          >
            C
          </span>
          <span style={{ lineHeight: 1 }}>
            <span
              style={{
                display: "block",
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              {siteConfig.brand}
            </span>
            <span
              style={{
                display: "block",
                fontSize: 11,
                color: "var(--faint)",
                marginTop: 3,
              }}
            >
              {domain}
            </span>
          </span>
        </Link>

        <div className="flex items-center" style={{ gap: 28 }}>
          <nav
            className="items-center"
            style={{ gap: 28, display: "none", fontSize: 15, fontWeight: 500 }}
            data-desktop-nav
          >
            <Link href="/servicios" className="nav-link">
              Servicios
            </Link>
            <Link href="/contacto#zonas" className="nav-link">
              Zonas
            </Link>
            <Link href="/contacto" className="nav-link">
              Contacto
            </Link>
          </nav>
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
            style={{ padding: "10px 18px", fontSize: 14, borderRadius: 10 }}
          >
            <WhatsAppIcon width={15} height={15} />
            WhatsApp
          </Link>
        </div>
      </div>
    </header>
  );
}
