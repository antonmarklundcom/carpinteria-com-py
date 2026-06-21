import { WaLink } from "./WaLink";
import { LEAD_PITCH } from "@/lib/site";

export function DarkCta({
  title = "Empezá tu proyecto",
  accent = "en madera.",
  context = "CTA",
}: {
  title?: string;
  accent?: string;
  context?: string;
}) {
  return (
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
          {title}{" "}
          <span
            className="accent"
            style={{ color: "var(--gold-bright)" }}
          >
            {accent}
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
          {LEAD_PITCH}
        </p>
        <WaLink context={context} />
      </div>
    </section>
  );
}
