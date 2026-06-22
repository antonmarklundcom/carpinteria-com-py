import Link from "next/link";
import { siteConfig, buildWaUrl } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { MobileNav } from "./MobileNav";
import { getServiceNavGroups, getZonaNavLinks } from "@/lib/nav";

export function Header() {
  const domain = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const waHref = buildWaUrl({ context: "Header" });
  const serviceGroups = getServiceNavGroups();
  const zonas = getZonaNavLinks();

  // Quick-access direct links in the top bar (per IA: Placares, Puertas).
  const directLinks = [
    { href: "/placares", label: "Placares" },
    { href: "/puertas-de-madera", label: "Puertas" },
  ];

  return (
    <header className="site-header">
      <div
        className="shell flex items-center justify-between"
        style={{ height: 72 }}
      >
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

        <div className="flex items-center" style={{ gap: 24 }}>
          <nav
            className="items-center"
            style={{ gap: 22, display: "none", fontSize: 15, fontWeight: 500 }}
            data-desktop-nav
          >
            {/* Servicios ▾ grouped dropdown */}
            <div className="has-dropdown">
              <Link href="/servicios" className="nav-link nav-trigger">
                Servicios <span aria-hidden="true">▾</span>
              </Link>
              <div className="dropdown-panel dropdown-mega">
                {serviceGroups.map((g) => (
                  <div key={g.label} className="dropdown-col">
                    <div className="dropdown-heading">{g.label}</div>
                    {g.items.map((it) => (
                      <Link key={it.href} href={it.href} className="dropdown-link">
                        {it.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {directLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}

            {/* Zonas ▾ dropdown */}
            <div className="has-dropdown">
              <Link href="/contacto#zonas" className="nav-link nav-trigger">
                Zonas <span aria-hidden="true">▾</span>
              </Link>
              <div className="dropdown-panel dropdown-zonas">
                {zonas.map((z) => (
                  <Link key={z.href} href={z.href} className="dropdown-link">
                    {z.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/quienes-somos" className="nav-link">
              Quiénes Somos
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

          <MobileNav
            serviceGroups={serviceGroups}
            zonas={zonas}
            directLinks={directLinks}
          />
        </div>
      </div>
    </header>
  );
}
