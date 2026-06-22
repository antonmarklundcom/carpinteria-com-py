// Navigation data, derived from the service + zona content so the nav stays in
// sync with the route set. Server-only (reads content via the fs-backed libs).

import {
  GROUPS,
  GROUP_ORDER,
  getServicesByGroup,
  serviceNavLabel,
} from "./content";
import { getAllZonas, zonaRouteSlug } from "./zonas";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

/** Grouped service links for the "Servicios ▾" dropdown. */
export function getServiceNavGroups(): NavGroup[] {
  return GROUP_ORDER.map((gk) => ({
    label: GROUPS[gk].label,
    items: getServicesByGroup(gk).map((s) => ({
      href: `/${s.slug}`,
      label: serviceNavLabel(s),
    })),
  })).filter((g) => g.items.length > 0);
}

/** Zona links for the "Zonas ▾" dropdown + footer. */
export function getZonaNavLinks(): NavLink[] {
  return getAllZonas().map((z) => ({
    href: `/${zonaRouteSlug(z.slug)}`,
    label: z.zona,
  }));
}
