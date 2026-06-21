import Link from "next/link";
import { buildWaUrl } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Standalone WhatsApp deep-link button. Server component — renders a prefilled
 * wa.me anchor. Used for the "inline CTA" spots that aren't tied to the form.
 */
export function WaLink({
  label = "Pedí presupuesto por WhatsApp",
  context,
  className = "btn-green",
}: {
  label?: string;
  context?: string;
  className?: string;
}) {
  const href = buildWaUrl({ context });
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <WhatsAppIcon />
      {label}
    </Link>
  );
}
