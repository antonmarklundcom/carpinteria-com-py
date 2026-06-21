import Link from "next/link";
import { buildWaUrl } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Fixed bottom WhatsApp bar — mobile only (hidden ≥880px via CSS). */
export function MobileWaBar({ context }: { context?: string }) {
  const href = buildWaUrl({ context: context || "Barra móvil" });
  return (
    <div className="mobile-wa-bar">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-green"
        style={{ width: "100%" }}
      >
        <WhatsAppIcon />
        Pedí presupuesto por WhatsApp
      </Link>
    </div>
  );
}
