import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileWaBar } from "./MobileWaBar";
import { LeadForm } from "./LeadForm";
import { Breadcrumb } from "./Breadcrumb";
import { WaLink } from "./WaLink";
import { JsonLd } from "./JsonLd";
import { DarkCta } from "./DarkCta";
import { getZonaDoc, getAllZonas, zonaRouteSlug } from "@/lib/zonas";
import { getListedServiceMeta, serviceNavLabel } from "@/lib/content";
import { localBusinessLd, breadcrumbLd } from "@/lib/seo";

export function ZonaPage({ routeSlug }: { routeSlug: string }) {
  const doc = getZonaDoc(routeSlug);
  if (!doc) return null;
  const { frontmatter: fm, bodyHtml } = doc;
  const h1 = `Carpintería a Medida en ${fm.zona}`;
  const path = `/${routeSlug}`;
  const context = `Carpintería en ${fm.zona}`;

  const services = getListedServiceMeta();
  const otherZonas = getAllZonas().filter((z) => z.slug !== fm.slug);

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Zonas", path: "/contacto#zonas" },
    { name: fm.zona, path },
  ];

  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd
        data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, path: c.path })))}
      />
      <Header />

      <main className="has-mobile-bar">
        <div className="shell" style={{ paddingTop: 22 }}>
          <Breadcrumb crumbs={crumbs} />
        </div>

        {/* HERO */}
        <section className="shell" style={{ padding: "16px 22px 48px" }}>
          <div className="hero-grid">
            <div className="hero-headline">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Carpintería en {fm.zona}
              </div>
              <h1 className="h1-hero">
                Carpintería <span className="accent">a Medida</span> en {fm.zona}
              </h1>
              <p
                style={{
                  fontSize: 19,
                  color: "var(--ink-soft)",
                  marginTop: 20,
                  maxWidth: 540,
                  lineHeight: 1.5,
                }}
              >
                {fm.intro}
              </p>
              <div className="chips-row" style={{ marginTop: 22 }}>
                {fm.barrios.map((b) => (
                  <div key={b} className="chip">
                    <b>{b}</b>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <WaLink context={context} />
              </div>
            </div>
            <div className="hero-form">
              <LeadForm source={routeSlug} eyebrow="Presupuesto sin compromiso" />
            </div>
          </div>
        </section>

        {/* UNIQUE LOCAL BODY */}
        <section className="shell" style={{ padding: "0 22px 24px" }}>
          <div
            className="prose"
            style={{ maxWidth: 760 }}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </section>

        {/* SERVICE LIST */}
        <section className="shell" style={{ padding: "24px 22px 16px" }}>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Lo que hacemos en {fm.zona}
          </h2>
          <div className="services-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="service-card">
                <div className="service-thumb" />
                <div className="card-title">{serviceNavLabel(s)}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* OTHER ZONAS */}
        {otherZonas.length > 0 && (
          <section className="shell" style={{ padding: "24px 22px 8px" }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Carpintería en otras zonas
            </h2>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px" }}
            >
              {otherZonas.map((z) => (
                <Link
                  key={z.slug}
                  href={`/${zonaRouteSlug(z.slug)}`}
                  className="footer-link"
                  style={{ fontSize: 15 }}
                >
                  Carpintería en {z.zona}
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 20 }}>
              <Link href="/servicios" className="footer-link" style={{ fontSize: 15 }}>
                Ver todos los servicios →
              </Link>
            </p>
          </section>
        )}

        <DarkCta context={context} />
      </main>

      <Footer />
      <MobileWaBar context={context} />
    </>
  );
}
