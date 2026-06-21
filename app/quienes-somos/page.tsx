import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { DarkCta } from "@/components/DarkCta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quiénes Somos",
  description:
    "Somos carpinteros que construimos en madera a medida en [Zona]. Trato directo, materiales nobles y un proceso claro. Conocé cómo trabajamos.",
  path: "/quienes-somos",
});

const VALUES = [
  {
    t: "Trato directo",
    d: "Te atiende el equipo que va a hacer el trabajo, no un call center. Hablás con quien construye.",
  },
  {
    t: "Materiales nobles",
    d: "Trabajamos madera tratada y herrajes de calidad. Te explicamos qué usamos y por qué, sin vueltas.",
  },
  {
    t: "Proceso claro",
    d: "Medimos, te pasamos un presupuesto sin sorpresas y coordinamos plazos realistas antes de arrancar.",
  },
  {
    t: "A tu medida",
    d: "No vendemos modelos cerrados: diseñamos cada trabajo para tu espacio, tu uso y tu presupuesto.",
  },
];

export default function QuienesSomosPage() {
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Quiénes somos", path: "/quienes-somos" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Header />
      <main className="has-mobile-bar">
        <div className="shell" style={{ paddingTop: 22 }}>
          <Breadcrumb crumbs={crumbs} />
        </div>

        <section className="shell" style={{ padding: "16px 22px 40px" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Quiénes somos
          </div>
          <h1 className="h1-hero" style={{ fontSize: 46 }}>
            Carpinteros que construyen{" "}
            <span className="accent">en madera.</span>
          </h1>
          <div className="prose" style={{ marginTop: 22, maxWidth: 680 }}>
            <p>
              Somos un equipo de carpintería que construye en madera a medida en{" "}
              [Zona] y alrededores: quinchos, casas, cocinas, aberturas, decks,
              placares y más. Nos gusta el trabajo bien hecho, prolijo y pensado
              para durar.
            </p>
            <p>
              Creemos en el trato directo y en la transparencia. Antes de
              arrancar te explicamos qué materiales usamos, cómo es el proceso y
              qué plazos son realistas. No prometemos lo que no podemos cumplir.
            </p>
          </div>
        </section>

        <section className="band-tint">
          <div className="shell" style={{ padding: "48px 22px" }}>
            <h2 className="section-title" style={{ marginBottom: 28 }}>
              Cómo trabajamos
            </h2>
            <div className="services-grid">
              {VALUES.map((v) => (
                <div key={v.t} className="card">
                  <div className="card-title">{v.t}</div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--muted)",
                      marginTop: 8,
                      lineHeight: 1.5,
                      marginBottom: 0,
                    }}
                  >
                    {v.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell" style={{ padding: "48px 22px 16px" }}>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            Nuestros trabajos
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              maxWidth: 620,
              marginTop: 0,
              marginBottom: 24,
            }}
          >
            Acá vamos a mostrar fotos reales de trabajos terminados. Las imágenes
            de abajo son marcadores temporales.
          </p>
          <Gallery tiles={6} />
        </section>

        <div style={{ height: 32 }} />
        <DarkCta context="Quiénes somos" />
      </main>
      <Footer />
      <MobileWaBar context="Quiénes somos" />
    </>
  );
}
