import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { LeadForm } from "@/components/LeadForm";
import { WaLink } from "@/components/WaLink";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { LEAD_PITCH } from "@/lib/site";
import { buildMetadata, breadcrumbLd, ZONES } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto · Pedí tu Presupuesto en [Zona]",
  description:
    "Escribinos por WhatsApp o dejanos tus datos y te pasamos presupuesto sin compromiso. Trabajamos en [Zona] y alrededores.",
  path: "/contacto",
});

export default function ContactoPage() {
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Header />
      <main className="has-mobile-bar">
        <div className="shell" style={{ paddingTop: 22 }}>
          <Breadcrumb crumbs={crumbs} />
        </div>

        <section className="shell" style={{ padding: "16px 22px 48px" }}>
          <div className="hero-grid">
            <div className="hero-headline">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Contacto
              </div>
              <h1 className="h1-hero" style={{ fontSize: 46 }}>
                Pedí tu presupuesto{" "}
                <span className="accent">sin compromiso.</span>
              </h1>
              <p
                style={{
                  fontSize: 19,
                  color: "var(--ink-soft)",
                  marginTop: 20,
                  maxWidth: 520,
                  lineHeight: 1.5,
                }}
              >
                {LEAD_PITCH} Te respondemos el mismo día.
              </p>
              <div style={{ marginTop: 24 }}>
                <WaLink context="Contacto" />
              </div>

              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "32px 0 24px",
                  maxWidth: 520,
                }}
              />

              <div id="zonas">
                <div className="eyebrow" style={{ marginBottom: 12 }}>
                  Zonas
                </div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.45,
                    maxWidth: 520,
                    marginTop: 0,
                  }}
                >
                  Trabajamos en{" "}
                  <span className="accent">{ZONES.join(", ")}</span> y
                  alrededores.
                </p>
              </div>
            </div>

            <div className="hero-form">
              <LeadForm source="contacto" eyebrow="Presupuesto sin compromiso" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileWaBar context="Contacto" />
    </>
  );
}
