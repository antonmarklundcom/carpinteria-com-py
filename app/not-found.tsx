import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WaLink } from "@/components/WaLink";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="shell"
        style={{ padding: "80px 22px", textAlign: "center" }}
      >
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Error 404
        </div>
        <h1 className="h1-hero" style={{ fontSize: 44 }}>
          No encontramos <span className="accent">esta página.</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--ink-soft)",
            margin: "20px auto 28px",
            maxWidth: 480,
          }}
        >
          Puede que el enlace esté roto o que la página haya cambiado de lugar.
          Volvé al inicio o escribinos por WhatsApp.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn-ghost">
            Volver al inicio
          </Link>
          <WaLink context="404" />
        </div>
      </main>
      <Footer />
    </>
  );
}
