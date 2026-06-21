import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { LeadForm } from "@/components/LeadForm";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, localBusinessLd } from "@/lib/seo";
import { WaLink } from "@/components/WaLink";

const HOME_SERVICES = [
  {
    title: "Quinchos",
    slug: "quinchos",
    desc: "Tu espacio para el asado, hecho para durar.",
  },
  {
    title: "Casas en tu Terreno",
    slug: "casas-de-madera",
    desc: "Construimos tu casa de madera donde la quieras.",
  },
  {
    title: "Cocinas a Medida",
    slug: "muebles-de-cocina",
    desc: "Diseñadas para tu espacio y tu día a día.",
  },
  {
    title: "Aberturas de Madera",
    slug: "ventanas-y-aberturas",
    desc: "Puertas, ventanas y portones a medida.",
  },
  {
    title: "Decks y Pérgolas",
    slug: "decks-y-pergolas",
    desc: "Sumá un espacio cálido al patio.",
  },
  {
    title: "Placares",
    slug: "placares-y-vestidores",
    desc: "Guardado prolijo, aprovechando cada rincón.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Escribinos",
    d: "Mandanos la medida y una foto por WhatsApp.",
  },
  { n: "02", t: "Visita", d: "Vamos a tu terreno a tomar las medidas." },
  {
    n: "03",
    t: "Presupuesto",
    d: "Te pasamos precio claro, sin compromiso.",
  },
  {
    n: "04",
    t: "Construimos",
    d: "Armamos tu proyecto y te lo entregamos.",
  },
];

const ZONE_LIST = "Asunción, Luque, Capiatá, San Lorenzo, Fernando de la Mora";

export default function HomePage() {
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
                Construimos en madera,{" "}
                <span className="accent">a tu medida.</span>
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
                Quinchos, casas, cocinas, aberturas, decks y placares — en tu
                terreno, hechos para durar. Pedí tu presupuesto y te
                respondemos el mismo día.
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
                  <b>Presupuesto gratis</b>
                  <span>Sin compromiso</span>
                </div>
                <div className="chip">
                  <b>Trato directo</b>
                  <span>Te atiende el equipo</span>
                </div>
                <div className="chip">
                  <b>En tu terreno</b>
                  <span>Donde lo necesites</span>
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
              Todo en madera, a medida
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

        {/* ZONAS + GALERÍA */}
        <section className="shell" style={{ padding: "56px 22px 64px" }}>
          <p
            id="zonas"
            style={{
              fontSize: 22,
              fontWeight: 700,
              maxWidth: 880,
              lineHeight: 1.4,
              marginBottom: 40,
              marginTop: 0,
            }}
          >
            Trabajamos en <span className="accent">{ZONE_LIST}</span> y
            alrededores.
          </p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Galería de trabajos
          </h2>
          <Gallery tiles={6} />
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
                en madera.
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
