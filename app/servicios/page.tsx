import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { DarkCta } from "@/components/DarkCta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { withZone } from "@/lib/site";
import {
  GROUPS,
  GROUP_ORDER,
  getServicesByGroup,
  serviceNavLabel,
} from "@/lib/content";
import { ObraCrossLink } from "@/components/ObraCrossLink";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de Carpintería a Medida en [Zona]",
  description:
    "Carpintería y ebanistería a medida en [Zona]: cocinas, mesadas, placares, puertas, muebles de melamina, aberturas, machimbre y más. En madera y melamina, con un equipo de 20 años de experiencia.",
  path: "/servicios",
});

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
            Carpintería y ebanistería,{" "}
            <span className="accent">a tu medida.</span>
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--ink-soft)",
              marginTop: 18,
              maxWidth: 640,
              lineHeight: 1.5,
            }}
          >
            Trabajamos en madera y melamina, con un equipo de 20 años de
            experiencia. Elegí lo que necesitás y pedí tu presupuesto sin
            compromiso por WhatsApp.
          </p>
        </section>

        {GROUP_ORDER.map((gk) => {
          const group = GROUPS[gk];
          const services = getServicesByGroup(gk);
          if (services.length === 0) return null;
          return (
            <section
              key={gk}
              className="shell"
              style={{ padding: "20px 22px 24px" }}
            >
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                {group.label}
              </h2>
              <div className="services-grid">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="service-card"
                  >
                    <div className="service-thumb" />
                    <div className="card-title">{serviceNavLabel(s)}</div>
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

        <section className="shell" style={{ padding: "24px 22px 8px" }}>
          <ObraCrossLink />
        </section>

        <div style={{ height: 32 }} />
        <DarkCta context="Servicios" />
      </main>
      <Footer />
      <MobileWaBar context="Servicios" />
    </>
  );
}
