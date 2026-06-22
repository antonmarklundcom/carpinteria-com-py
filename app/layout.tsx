import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand} — Carpintería a medida en madera y melamina`,
    template: `%s | ${siteConfig.brand}`,
  },
  description:
    "Carpintería y ebanistería a medida en madera y melamina: cocinas, placares, puertas, mesadas y muebles. Equipo con 20 años de experiencia. Presupuesto sin compromiso por WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PY" className={`${hanken.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
