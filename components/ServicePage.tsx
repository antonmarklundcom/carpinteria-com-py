import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileWaBar } from "./MobileWaBar";
import { LeadForm } from "./LeadForm";
import { SidebarInfo } from "./SidebarInfo";
import { Gallery } from "./Gallery";
import { Faq } from "./Faq";
import { Breadcrumb } from "./Breadcrumb";
import { JsonLd } from "./JsonLd";
import { DarkCta } from "./DarkCta";
import { siteConfig, withZone } from "@/lib/site";
import {
  GROUPS,
  getServiceDoc,
  getServiceMeta,
  serviceNavLabel,
  type ServiceFrontmatter,
} from "@/lib/content";
import {
  serviceLd,
  faqLd,
  breadcrumbLd,
} from "@/lib/seo";

export function ServicePage({ slug }: { slug: string }) {
  const doc = getServiceDoc(slug);
  if (!doc) return null;
  const { frontmatter: fm, introHtml, sections } = doc;
  const group = GROUPS[fm.group];
  const h1 = withZone(fm.h1);
  const path = `/${fm.slug}`;

  // Resolve related services that actually exist + are renderable.
  const related = fm.related
    .map((rs) => getServiceMeta(rs))
    .filter((m): m is ServiceFrontmatter => m !== null);

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: group.short, path: "/servicios" },
    { name: h1, path },
  ];

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: fm.title,
          description: fm.description,
          path,
        })}
      />
      <JsonLd data={faqLd(fm.faq)} />
      <JsonLd
        data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, path: c.path })))}
      />
      <Header />

      <main className="has-mobile-bar">
        <div className="shell" style={{ paddingTop: 22 }}>
          <Breadcrumb crumbs={crumbs} />
        </div>

        {/* 2-COLUMN BODY: main content (left) + sticky form/info (right) */}
        <div className="shell" style={{ padding: "16px 22px 32px" }}>
          <div className="content-layout">
            {/* HEAD — eyebrow → H1 → intro */}
            <div className="cl-head">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                {group.label}
              </div>
              <h1 className="h1-hero">{h1}</h1>
              {introHtml && (
                <div
                  className="prose"
                  style={{ marginTop: 20 }}
                  dangerouslySetInnerHTML={{ __html: introHtml }}
                />
              )}
            </div>

            {/* STICKY SIDEBAR — lead form + compact info block */}
            <aside className="cl-aside">
              <LeadForm source={fm.slug} eyebrow="Presupuesto sin compromiso" />
              <SidebarInfo zona={siteConfig.zone} context={h1} />
            </aside>

            {/* BODY — H2 sections (no buttons) → galería → FAQ */}
            <div className="cl-body">
              {sections.map((sec, i) => (
                <section key={i} style={{ padding: "20px 0" }}>
                  <h2
                    className="section-title"
                    style={{ fontSize: 28, marginBottom: 14 }}
                  >
                    {sec.heading}
                  </h2>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: sec.html }}
                  />
                </section>
              ))}

              {/* GALERÍA */}
              <section style={{ padding: "28px 0 16px" }}>
                <h2 className="section-title" style={{ marginBottom: 24 }}>
                  Galería de trabajos
                </h2>
                <Gallery tiles={4} />
              </section>

              {/* FAQ */}
              <section style={{ padding: "16px 0 8px" }}>
                <h2 className="section-title" style={{ marginBottom: 16 }}>
                  Preguntas frecuentes
                </h2>
                <Faq
                  items={fm.faq.map((f) => ({
                    q: withZone(f.q),
                    a: withZone(f.a),
                  }))}
                />
              </section>
            </div>
          </div>
        </div>

        {/* SERVICIOS RELACIONADOS — full width below the 2-col grid */}
        {related.length > 0 && (
          <section className="shell" style={{ padding: "16px 22px 56px" }}>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Servicios relacionados
            </h2>
            <div className="services-grid">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="service-card"
                >
                  <div className="service-thumb" />
                  <div className="card-title">{serviceNavLabel(r)}</div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--muted)",
                      marginTop: 6,
                      lineHeight: 1.45,
                      marginBottom: 0,
                    }}
                  >
                    {withZone(r.description).slice(0, 90)}…
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <DarkCta context={h1} />
      </main>

      <Footer />
      <MobileWaBar context={h1} />
    </>
  );
}
