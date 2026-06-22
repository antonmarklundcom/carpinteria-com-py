import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { LeadForm } from "@/components/LeadForm";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ObraCrossLink } from "@/components/ObraCrossLink";
import { organizationLd, localBusinessLd, buildMetadata } from "@/lib/seo";
import { WaLink } from "@/components/WaLink";
import { withZone } from "@/lib/site";
import { getAllZonas, zonaRouteSlug } from "@/lib/zonas";

export const metadata: Metadata = buildMetadata({
  title: "Carpintería a Medida en [Zona]",
  description:
    "Carpintería y ebanistería a medida en [Zona], con un equipo de 20 años de experiencia. Cocinas, placares, puertas, mesadas y muebles en madera y melamina. Presupuesto sin compromiso por WhatsApp.",
  path: "/",
});

const HOME_SERVICES = [
  {
    title: "Placares y Vestidores",
    slug: "placares",
    desc: "Guardado prolijo, aprovechando cada rincón.",
  },
  {
    title: "Puertas de Madera",
    slug: "puertas-de-madera",
    desc: "Principales e interiores, a medida del vano.",
  },
  {
    title: "Mesadas de Cocina",
    slug: "mesadas-de-cocina",
    desc: "Granito, cuarzo o madera, con pileta integrada.",
  },
  {
    title: "Muebles de Cocina",
    slug: "muebles-de-cocina",
    desc: "Diseñadas para tu espacio y tu día a día.",
  },
  {
    title: "Pérgolas y Decks",
    slug: "pergolas-y-decks",
    desc: "Sumá un espacio cálido al patio, en madera.",
  },
  {
    title: "Muebles de Melamina",
    slug: "muebles-de-melamina",
    desc: "Muebles armados a medida, no venta de planchas.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Escribinos",
    d: "Mandanos la medida y una foto por WhatsApp.",
  },
  { n: "02", t: "Visita", d: "Vamos a tu casa a tomar las medidas." },
  {
    n: "03",
    t: "Presupuesto",
    d: "Te pasamos precio claro, sin compromiso.",
  },
  {
    n: "04",
    t: "Fabricamos",
    d: "Armamos y montamos tu proyecto, a tiempo.",
  },
];

export default function HomePage() {
  const zonas = getAllZonas();

  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={localBusinessLd()} />
      <Header />

      <main className="has-mobile-bar">
        {/* HERO */}
        <section className="shell" style={{ padding: "40px 22px 56px" }}>
          <div className="hero-grid">
            <div className="hero-headline">
              <h1 className="h1-hero">
                Carpintería <span className="accent">a Medida</span> en{" "}
                {withZone("[Zona]")}
              </h1>
              <p
                style={{
                  fontSize: 21,
                  color: "var(--ink-soft)",
                  marginTop: 22,
                  maxWidth: 520,
                  lineHeight: 1.5,
                }}
              >
                Cocinas, placares, puertas y muebles a medida, en madera y
                melamina. Somos un equipo con{" "}
                <strong>20 años de experiencia</strong> — trabajo terminado a
                tiempo y presupuesto claro.
              </p>
              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "30px 0 24px",
                  maxWidth: 520,
                }}
              />
              <div className="chips-row">
                <div className="chip">
                  <b>20 años de experiencia</b>
                  <span>Oficio comprobado</span>
                </div>
                <div className="chip">
                  <b>Equipo establecido</b>
                  <span>No desaparecemos</span>
                </div>
                <div className="chip">
                  <b>Presupuesto claro</b>
                  <span>Sin sorpresas</span>
                </div>
              </div>
            </div>

            <div className="hero-form">
              <LeadForm source="home" />
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="shell" style={{ padding: "20px 22px 64px" }}>
          <div className="section-head">
            <h2 className="section-title">Lo que construimos</h2>
            <span style={{ fontSize: 15, color: "var(--muted-2)" }}>
              En madera y melamina, a medida
            </span>
          </div>
          <div className="services-grid">
            {HOME_SERVICES.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="service-card">
                <div className="service-thumb" />
                <div className="card-title">{s.title}</div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    marginTop: 6,
                    lineHeight: 1.45,
                    marginBottom: 0,
                  }}
                >
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 22 }}>
            <Link href="/servicios" className="footer-link" style={{ fontSize: 15 }}>
              Ver todos los servicios →
            </Link>
          </p>
        </section>

        {/* CÓMO TRABAJAMOS */}
        <section className="band-tint">
          <div className="shell" style={{ padding: "56px 22px" }}>
            <h2 className="section-title" style={{ marginBottom: 36 }}>
              Cómo trabajamos
            </h2>
            <div className="steps-grid">
              {STEPS.map((s) => (
                <div key={s.n}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--gold)",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      height: 1,
                      background: "#E0D6C2",
                      margin: "14px 0",
                    }}
                  />
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{s.t}</div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--muted)",
                      marginTop: 7,
                      lineHeight: 1.45,
                      marginBottom: 0,
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ZONAS — location network */}
        <section className="shell" style={{ padding: "56px 22px 16px" }}>
          <div className="section-head">
            <h2 className="section-title" id="zonas">
              Carpintería en tu zona
            </h2>
            <span style={{ fontSize: 15, color: "var(--muted-2)" }}>
              Trabajamos en {withZone("[Zona]")} y alrededores
            </span>
          </div>
          <div className="zona-grid">
            {zonas.map((z) => (
              <Link
                key={z.slug}
                href={`/${zonaRouteSlug(z.slug)}`}
                className="zona-chip"
              >
                Carpintería en {z.zona}
              </Link>
            ))}
          </div>
        </section>

        {/* GALERÍA */}
        <section className="shell" style={{ padding: "40px 22px 56px" }}>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Galería de trabajos
          </h2>
          <Gallery tiles={6} />
        </section>

        {/* OBRA CROSS-LINK */}
        <section className="shell" style={{ padding: "0 22px 56px" }}>
          <ObraCrossLink />
        </section>

        {/* DARK CTA */}
        <section className="shell" style={{ padding: "0 22px 64px" }}>
          <div
            className="band-dark"
            style={{ padding: "56px 32px", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Empezá tu proyecto{" "}
              <span className="accent" style={{ color: "var(--gold-bright)" }}>
                a medida.
              </span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#bdb6a8",
                margin: "16px auto 28px",
                maxWidth: 520,
              }}
            >
              Mandanos la medida y una foto. Te pasamos presupuesto sin
              compromiso.
            </p>
            <WaLink context="Home CTA" />
          </div>
        </section>
      </main>

      <Footer />
      <MobileWaBar context="Home" />
    </>
  );
}
