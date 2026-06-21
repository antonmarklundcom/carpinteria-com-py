import type { Metadata } from "next";
import { siteConfig, withZone } from "./site";

export const ZONES = [
  "Asunción",
  "Luque",
  "Capiatá",
  "San Lorenzo",
  "Fernando de la Mora",
  "Mariano Roque Alonso",
  "Ñemby",
  "Lambaré",
];

/** Build per-page metadata with canonical + OpenGraph. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const title = withZone(opts.title);
  const description = withZone(opts.description);
  const url = `${siteConfig.url.replace(/\/$/, "")}${opts.path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brand,
      locale: "es_PY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: siteConfig.url,
    areaServed: ZONES,
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand,
    url: siteConfig.url,
    description:
      "Carpintería a medida en madera: quinchos, casas, cocinas, aberturas, decks, placares y más. Presupuesto sin compromiso por WhatsApp.",
    areaServed: ZONES.map((z) => ({ "@type": "City", name: z })),
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.zone,
      addressCountry: "PY",
    },
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: withZone(opts.name),
    description: withZone(opts.description),
    serviceType: "Carpintería en madera",
    provider: { "@type": "LocalBusiness", name: siteConfig.brand },
    areaServed: ZONES.map((z) => ({ "@type": "City", name: z })),
    url: `${siteConfig.url.replace(/\/$/, "")}${opts.path}`,
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: withZone(f.q),
      acceptedAnswer: { "@type": "Answer", text: withZone(f.a) },
    })),
  };
}

export function breadcrumbLd(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url.replace(/\/$/, "")}${c.path}`,
    })),
  };
}
