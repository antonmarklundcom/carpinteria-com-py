import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { DarkCta } from "@/components/DarkCta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { withZone } from "@/lib/site";
import { PILLARS, getServicesByPillar, type PillarKey } from "@/lib/content";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de Carpintería en Madera en [Zona]",
  description:
    "Todos nuestros servicios de carpintería en madera a medida en [Zona]: obra y estructuras, aberturas y carpintería a medida. Pedí tu presupuesto sin compromiso.",
  path: "/servicios",
});

const PILLAR_ORDER: PillarKey[] = ["obra", "aberturas", "a-medida"];

export default function ServiciosPage() {
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Header />
      <main className="has-mobile-bar">
        <div className="shell" style={{ paddingTop: 22 }}>
          <Breadcrumb crumbs={crumbs} />
        </div>

        <section className="shell" style={{ padding: "16px 22px 32px" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Servicios
          </div>
          <h1 className="h1-hero" style={{ fontSize: 44 }}>
            Todo en madera, <span className="accent">a tu medida.</span>
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--ink-soft)",
              marginTop: 18,
              maxWidth: 620,
              lineHeight: 1.5,
            }}
          >
            Construimos en madera para tu casa y tu terreno. Elegí lo que
            necesitás y pedí tu presupuesto sin compromiso por WhatsApp.
          </p>
        </section>

        {PILLAR_ORDER.map((pk) => {
          const pillar = PILLARS[pk];
          const services = getServicesByPillar(pk);
          if (services.length === 0) return null;
          return (
            <section
              key={pk}
              className="shell"
              style={{ padding: "20px 22px 24px" }}
            >
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                {pillar.label}
              </h2>
              <div className="services-grid">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="service-card"
                  >
                    <div className="service-thumb" />
                    <div className="card-title">
                      {withZone(s.h1).replace(/\s+en .*/i, "")}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--muted)",
                        marginTop: 6,
                        lineHeight: 1.45,
                        marginBottom: 0,
                      }}
                    >
                      {withZone(s.description).slice(0, 90)}…
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div style={{ height: 32 }} />
        <DarkCta context="Servicios" />
      </main>
      <Footer />
      <MobileWaBar context="Servicios" />
    </>
  );
}
