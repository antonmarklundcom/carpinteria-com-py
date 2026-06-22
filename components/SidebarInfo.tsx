import Link from "next/link";
import { buildWaUrl } from "@/lib/site";

/**
 * Compact trust/info block that sits below the lead-form card in the sticky
 * sidebar of service + location pages. Small text, reuses existing tokens.
 */
export function SidebarInfo({
  zona,
  context,
}: {
  zona: string;
  context?: string;
}) {
  const waHref = buildWaUrl({ context });
  return (
    <div className="sidebar-info">
      <p className="sidebar-trust">
        20 años de experiencia · Equipo establecido · Presupuesto claro
      </p>
      <p>
        Mandanos la medida + una foto y te pasamos presupuesto sin compromiso.
      </p>
      <p>
        <Link href={waHref} target="_blank" rel="noopener noreferrer">
          Escribinos por WhatsApp →
        </Link>
      </p>
      <p>Atendemos en {zona} y alrededores.</p>
    </div>
  );
}
