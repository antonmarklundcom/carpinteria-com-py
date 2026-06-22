"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavGroup, NavLink } from "@/lib/nav";

/**
 * Mobile menu — hamburger toggle that expands into a collapsible panel with the
 * grouped Servicios links and the Zonas list. Hidden ≥880px via CSS; the
 * desktop nav (CSS-hover dropdowns) takes over there.
 */
export function MobileNav({
  serviceGroups,
  zonas,
  directLinks,
}: {
  serviceGroups: NavGroup[];
  zonas: NavLink[];
  directLinks: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`burger ${open ? "is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div className="mobile-nav-panel" role="dialog" aria-label="Menú">
          {directLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="mobile-nav-link mobile-nav-top"
              onClick={close}
            >
              {l.label}
            </Link>
          ))}

          {serviceGroups.map((g) => (
            <div key={g.label} className="mobile-nav-section">
              <div className="mobile-nav-heading">{g.label}</div>
              {g.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="mobile-nav-link"
                  onClick={close}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="mobile-nav-section">
            <div className="mobile-nav-heading">Zonas</div>
            {zonas.map((z) => (
              <Link
                key={z.href}
                href={z.href}
                className="mobile-nav-link"
                onClick={close}
              >
                Carpintería en {z.label}
              </Link>
            ))}
          </div>

          <div className="mobile-nav-section">
            <Link
              href="/servicios"
              className="mobile-nav-link mobile-nav-top"
              onClick={close}
            >
              Todos los servicios
            </Link>
            <Link
              href="/quienes-somos"
              className="mobile-nav-link mobile-nav-top"
              onClick={close}
            >
              Quiénes Somos
            </Link>
            <Link
              href="/contacto"
              className="mobile-nav-link mobile-nav-top"
              onClick={close}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
