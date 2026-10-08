/**
 * Generates `public/robots.txt` and `public/sitemap.xml` from the same metadata the app uses.
 *
 * Runs before every build (`npm run build`) through Node.js native type stripping, so no
 * extra tooling is required. While `SITE_CONFIG.siteUrl` is `null` the sitemap is removed and
 * robots.txt omits the `Sitemap:` directive: publishing guessed absolute URLs is worse than none.
 */
import { rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE_CONFIG } from '../src/app/core/config/site.config.ts';
import { PAGE_METADATA, type PageMetadata } from '../src/app/core/seo/page-metadata.ts';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const robotsPath = `${publicDirectory}robots.txt`;
const sitemapPath = `${publicDirectory}sitemap.xml`;

function normalizeOrigin(siteUrl: string): string {
  const url = new URL(siteUrl);
  if (url.protocol !== 'https:') {
    throw new Error(`SITE_CONFIG.siteUrl must use https, received "${siteUrl}".`);
  }
  return url.origin;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildSitemap(origin: string, pages: readonly PageMetadata[]): string {
  const lastModified = new Date().toISOString().slice(0, 10);
  const entries = pages.map((page) => {
    const location = escapeXml(page.path ? `${origin}/${page.path}` : `${origin}/`);
    return [
      '  <url>',
      `    <loc>${location}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      `    <changefreq>${page.changeFrequency}</changefreq>`,
      `    <priority>${page.priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

function buildRobots(origin: string | null): string {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /404'];
  if (origin) {
    lines.push('', `Sitemap: ${origin}/sitemap.xml`);
  }
  return `${lines.join('\n')}\n`;
}

async function main(): Promise<void> {
  const origin = SITE_CONFIG.siteUrl ? normalizeOrigin(SITE_CONFIG.siteUrl) : null;
  const indexablePages = Object.values(PAGE_METADATA).filter((page) => page.indexable);

  await writeFile(robotsPath, buildRobots(origin), 'utf8');

  if (!origin) {
    await rm(sitemapPath, { force: true });
    console.warn(
      '[seo] SITE_CONFIG.siteUrl is not set: sitemap.xml skipped and robots.txt written without a Sitemap directive.',
    );
    return;
  }

  await writeFile(sitemapPath, buildSitemap(origin, indexablePages), 'utf8');
  console.info(`[seo] sitemap.xml written with ${indexablePages.length} URLs for ${origin}.`);
}

await main();
