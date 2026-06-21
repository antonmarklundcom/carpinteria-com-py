// MDX content pipeline for service pages. Reads content/servicios/*.mdx,
// validates frontmatter with zod at build time, and exposes typed accessors.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

export const PILLARS = {
  obra: {
    key: "obra",
    label: "Obra y estructuras en madera",
    short: "Obra en madera",
  },
  aberturas: {
    key: "aberturas",
    label: "Aberturas de madera",
    short: "Aberturas",
  },
  "a-medida": {
    key: "a-medida",
    label: "Carpintería a medida",
    short: "A medida",
  },
} as const;

export type PillarKey = keyof typeof PILLARS;

const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  h1: z.string().min(1),
  slug: z.string().min(1),
  pillar: z.enum(["obra", "aberturas", "a-medida"]),
  primaryKw: z.string().min(1),
  description: z.string().min(1),
  h2s: z.array(z.string().min(1)).min(1),
  faq: z.array(faqSchema).min(1),
  related: z.array(z.string().min(1)).default([]),
  order: z.number(),
  listed: z.boolean().default(true),
});

export type ServiceFrontmatter = z.infer<typeof frontmatterSchema>;

export interface ServiceSection {
  heading: string;
  /** HTML rendered from the markdown body for this section. */
  html: string;
}

export interface ServiceDoc {
  frontmatter: ServiceFrontmatter;
  /** Intro paragraph(s) before the first ## heading, as HTML. */
  introHtml: string;
  sections: ServiceSection[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "servicios");

let cachedSlugs: string[] | null = null;

export function getServiceSlugs(): string[] {
  if (cachedSlugs) return cachedSlugs;
  if (!fs.existsSync(CONTENT_DIR)) return [];
  cachedSlugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  return cachedSlugs;
}

function readRaw(slug: string): { data: unknown; content: string } | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

/** Frontmatter only — fast, used for indexes, nav and sitemap. */
export function getServiceMeta(slug: string): ServiceFrontmatter | null {
  const raw = readRaw(slug);
  if (!raw) return null;
  const parsed = frontmatterSchema.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${slug}.mdx: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

export function getAllServiceMeta(): ServiceFrontmatter[] {
  return getServiceSlugs()
    .map((slug) => getServiceMeta(slug))
    .filter((m): m is ServiceFrontmatter => m !== null)
    .sort((a, b) => a.order - b.order);
}

export function getListedServiceMeta(): ServiceFrontmatter[] {
  return getAllServiceMeta().filter((m) => m.listed);
}

export function getServicesByPillar(pillar: PillarKey): ServiceFrontmatter[] {
  return getListedServiceMeta().filter((m) => m.pillar === pillar);
}

marked.setOptions({ gfm: true, breaks: false });

function renderMd(md: string): string {
  return marked.parse(md.trim(), { async: false }) as string;
}

/** Full document: frontmatter + intro + per-h2 sections (markdown -> HTML). */
export function getServiceDoc(slug: string): ServiceDoc | null {
  const raw = readRaw(slug);
  if (!raw) return null;
  const parsed = frontmatterSchema.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${slug}.mdx: ${parsed.error.message}`,
    );
  }
  const frontmatter = parsed.data;

  // Split the body on level-2 headings. Anything before the first ## is intro.
  const body = raw.content.trim();
  const parts = body.split(/\n(?=##\s)/);

  let introHtml = "";
  const sections: ServiceSection[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("##")) {
      const firstNl = trimmed.indexOf("\n");
      const headingLine =
        firstNl === -1 ? trimmed : trimmed.slice(0, firstNl);
      const heading = headingLine.replace(/^#{2,}\s*/, "").trim();
      const sectionBody = firstNl === -1 ? "" : trimmed.slice(firstNl + 1);
      sections.push({ heading, html: renderMd(sectionBody) });
    } else {
      introHtml = renderMd(trimmed);
    }
  }

  return { frontmatter, introHtml, sections };
}
