// Location-page data layer. Reads content/zonas/*.mdx, validates frontmatter
// with zod at build time, and exposes typed accessors. Each zona renders at
// /carpinteria-<slug> via the shared [slug] route + ZonaPage template.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

export const ZONA_PREFIX = "carpinteria-";

export const zonaFrontmatterSchema = z.object({
  /** Display name, with accents/ñ (e.g. "Ñemby"). */
  zona: z.string().min(1),
  /** URL-safe slug, no accents/ñ (e.g. "nemby"). Route = /carpinteria-<slug>. */
  slug: z.string().min(1),
  /** Real barrios / landmarks of the zona, used in the localized intro + chips. */
  barrios: z.array(z.string().min(1)).min(1),
  /** Lower = higher priority (home base first). Drives nav/sitemap order. */
  priority: z.number(),
  /** Short, unique localized lead-in shown under the H1. */
  intro: z.string().min(1),
});

export type ZonaFrontmatter = z.infer<typeof zonaFrontmatterSchema>;

export interface ZonaDoc {
  frontmatter: ZonaFrontmatter;
  /** Rendered HTML of the unique localized body (everything after frontmatter). */
  bodyHtml: string;
}

const ZONAS_DIR = path.join(process.cwd(), "content", "zonas");

let cachedSlugs: string[] | null = null;

function fileSlugs(): string[] {
  if (cachedSlugs) return cachedSlugs;
  if (!fs.existsSync(ZONAS_DIR)) return (cachedSlugs = []);
  cachedSlugs = fs
    .readdirSync(ZONAS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  return cachedSlugs;
}

function readRaw(slug: string): { data: unknown; content: string } | null {
  const file = path.join(ZONAS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function parse(slug: string): ZonaFrontmatter | null {
  const raw = readRaw(slug);
  if (!raw) return null;
  const parsed = zonaFrontmatterSchema.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(`Invalid zona frontmatter in ${slug}.mdx: ${parsed.error.message}`);
  }
  return parsed.data;
}

/** All zonas, ordered by priority then name. */
export function getAllZonas(): ZonaFrontmatter[] {
  return fileSlugs()
    .map((s) => parse(s))
    .filter((z): z is ZonaFrontmatter => z !== null)
    .sort((a, b) => a.priority - b.priority || a.zona.localeCompare(b.zona));
}

/** The full route slug for a zona file slug, e.g. "luque" -> "carpinteria-luque". */
export function zonaRouteSlug(slug: string): string {
  return `${ZONA_PREFIX}${slug}`;
}

/** All zona route slugs (carpinteria-<slug>) for generateStaticParams + sitemap. */
export function getZonaRouteSlugs(): string[] {
  return getAllZonas().map((z) => zonaRouteSlug(z.slug));
}

/** Resolve a route slug (carpinteria-<slug>) back to a zona, or null. */
export function getZonaByRouteSlug(routeSlug: string): ZonaFrontmatter | null {
  if (!routeSlug.startsWith(ZONA_PREFIX)) return null;
  const slug = routeSlug.slice(ZONA_PREFIX.length);
  return parse(slug);
}

marked.setOptions({ gfm: true, breaks: false });

export function getZonaDoc(routeSlug: string): ZonaDoc | null {
  if (!routeSlug.startsWith(ZONA_PREFIX)) return null;
  const slug = routeSlug.slice(ZONA_PREFIX.length);
  const raw = readRaw(slug);
  if (!raw) return null;
  const parsed = zonaFrontmatterSchema.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(`Invalid zona frontmatter in ${slug}.mdx: ${parsed.error.message}`);
  }
  const bodyHtml = marked.parse(raw.content.trim(), { async: false }) as string;
  return { frontmatter: parsed.data, bodyHtml };
}

/** Display names of all built zonas — used for LocalBusiness areaServed. */
export function getZonaNames(): string[] {
  return getAllZonas().map((z) => z.zona);
}
