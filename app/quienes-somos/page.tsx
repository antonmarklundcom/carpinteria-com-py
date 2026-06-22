import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileWaBar } from "@/components/MobileWaBar";
import { DarkCta } from "@/components/DarkCta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ObraCrossLink } from "@/components/ObraCrossLink";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { getZonaNames } from "@/lib/zonas";

export const metadata: Metadata = buildMetadata({
  title: "Quiénes Somos: Carpintería con 20 Años de Experiencia",
  description:
    "Somos un taller de carpintería y ebanistería con un equipo de 20 años de experiencia en [Zona]. Trabajamos en madera y melamina, con una red de trades de confianza. Conocé cómo trabajamos.",
  path: "/quienes-somos",
});

const VALUES = [
  {
    t: "Equipo establecido",
    d: "No somos una sola persona: tenemos un equipo armado y una red de contactos de oficio. El trabajo avanza parejo y no queda a medias.",
  },
  {
    t: "20 años de experiencia",
    d: "Dos décadas haciendo cocinas, placares, puertas y muebles nos enseñaron a resolver bien y a aconsejar con honestidad qué conviene en cada caso.",
  },
  {
    t: "Madera y melamina",
    d: "Trabajamos las dos: la madera por su nobleza y la melamina por su practicidad y precio. Te explicamos qué usar y por qué, sin vueltas.",
  },
  {
    t: "Presupuesto claro y a tiempo",
    d: "Medimos, te pasamos un presupuesto sin sorpresas y coordinamos plazos realistas. Y cumplimos: el trabajo se entrega terminado en fecha.",
  },
];

export default function QuienesSomosPage() {
  const zonas = getZonaNames();
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
            Un oficio de{" "}
            <span className="accent">20 años,</span> con todo un equipo.
          </h1>
          <div className="prose" style={{ marginTop: 22, maxWidth: 680 }}>
            <p>
              Somos un taller de <strong>carpintería y ebanistería a medida</strong>{" "}
              con <strong>20 años de experiencia</strong> en [Zona]. En estos
              años pasamos por cocinas, placares, puertas, mesadas, muebles de
              melamina, aberturas y todo tipo de muebles empotrados — y eso es lo
              que nos da el ojo para resolver bien y aconsejarte con honestidad.
            </p>
            <p>
              A diferencia de un taller de una sola persona, trabajamos con un{" "}
              <strong>equipo establecido</strong> y una{" "}
              <strong>red de contactos de oficio</strong> de confianza
              (herrería, piedra, instalaciones). Eso significa que el trabajo
              avanza parejo, no queda a medio terminar y se entrega en fecha. Acá
              la gente compra tranquilidad, y eso es lo que ofrecemos.
            </p>
            <p>
              Trabajamos en <strong>madera y melamina</strong>: la madera por su
              nobleza y la melamina por lo práctica y económica que es. Antes de
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

        <section className="shell" style={{ padding: "48px 22px 8px" }}>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            Dónde trabajamos
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--muted)",
              maxWidth: 680,
              marginTop: 0,
              marginBottom: 0,
              lineHeight: 1.6,
            }}
          >
            Nuestra base está en <strong>Guarambaré</strong> y atendemos toda la
            zona: {zonas.join(", ")} y alrededores. Coordinamos la visita para
            tomar medidas y la entrega sin complicarte.
          </p>
        </section>

        <section className="shell" style={{ padding: "32px 22px 8px" }}>
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

        <section className="shell" style={{ padding: "32px 22px 8px" }}>
          <ObraCrossLink />
        </section>

        <div style={{ height: 32 }} />
        <DarkCta context="Quiénes somos" accent="a medida." />
      </main>
      <Footer />
      <MobileWaBar context="Quiénes somos" />
    </>
  );
}
