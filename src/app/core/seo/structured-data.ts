import { SITE_CONFIG } from '../config/site.config';
import { SOCIAL_PROFILES } from '../config/social.config';
import { BOOKS } from '../../data/books.data';
import { JAMIL_PROFILE } from '../../data/jamil.data';
import { VIDEOS } from '../../data/media.data';
import { NAPOLEON_HILL_PROFILE } from '../../data/napoleon-hill.data';
import { PAGE_METADATA, type PageKey } from './page-metadata';

export type JsonValue =
  string | number | boolean | null | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export type StructuredData = Readonly<Record<string, JsonValue>>;

/** Resolves a site-relative path to an absolute URL, or `null` while the domain is unknown. */
export function toAbsoluteUrl(path: string): string | null {
  if (!SITE_CONFIG.siteUrl) {
    return null;
  }
  const origin = SITE_CONFIG.siteUrl.replace(/\/+$/, '');
  return path ? `${origin}/${path.replace(/^\/+/, '')}` : `${origin}/`;
}

/** Drops `null` values so schemas never advertise empty properties. */
function compact(entries: Record<string, JsonValue | undefined>): StructuredData {
  return Object.fromEntries(
    Object.entries(entries).filter(
      (entry): entry is [string, JsonValue] => entry[1] !== null && entry[1] !== undefined,
    ),
  );
}

function buildOrganization(): StructuredData {
  return compact({
    '@type': 'Organization',
    '@id': toAbsoluteUrl('#organization'),
    name: SITE_CONFIG.name,
    url: toAbsoluteUrl(''),
    logo: SITE_CONFIG.logo ? toAbsoluteUrl(SITE_CONFIG.logo.src) : null,
    sameAs: SOCIAL_PROFILES.length ? SOCIAL_PROFILES.map((profile) => profile.url) : null,
  });
}

function buildWebSite(): StructuredData {
  return compact({
    '@type': 'WebSite',
    name: SITE_CONFIG.shortName,
    url: toAbsoluteUrl(''),
    inLanguage: SITE_CONFIG.language,
  });
}

function buildBreadcrumbs(key: PageKey): StructuredData | null {
  const page = PAGE_METADATA[key];
  const homeUrl = toAbsoluteUrl('');
  const pageUrl = toAbsoluteUrl(page.path);
  if (key === 'home' || !homeUrl || !pageUrl) {
    return null;
  }
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: PAGE_METADATA.home.breadcrumb, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: pageUrl },
    ],
  };
}

function buildNapoleonHill(): StructuredData {
  return {
    '@type': 'Person',
    name: NAPOLEON_HILL_PROFILE.name,
    birthDate: NAPOLEON_HILL_PROFILE.birthDate,
    deathDate: NAPOLEON_HILL_PROFILE.deathDate,
    birthPlace: NAPOLEON_HILL_PROFILE.birthPlace,
    jobTitle: 'Escritor',
  };
}

function buildJamil(): StructuredData | null {
  // Only published once an official biography exists; a bare name adds no truthful value.
  if (!JAMIL_PROFILE.summary.length) {
    return null;
  }
  return compact({
    '@type': 'Person',
    name: `${JAMIL_PROFILE.givenName} ${JAMIL_PROFILE.familyName}`,
    givenName: JAMIL_PROFILE.givenName,
    familyName: JAMIL_PROFILE.familyName,
    jobTitle: JAMIL_PROFILE.role,
    description: JAMIL_PROFILE.summary[0] ?? null,
    image: JAMIL_PROFILE.portrait ? toAbsoluteUrl(JAMIL_PROFILE.portrait.src) : null,
  });
}

function buildBooks(): StructuredData[] {
  return BOOKS.map((book) =>
    compact({
      '@type': 'Book',
      name: book.originalTitle,
      alternateName: book.portugueseTitle,
      datePublished: String(book.year),
      description: book.description,
      author: { '@type': 'Person', name: NAPOLEON_HILL_PROFILE.name },
    }),
  );
}

function buildVideos(): StructuredData[] {
  return VIDEOS.filter((video) => video.uploadDate).map((video) =>
    compact({
      '@type': 'VideoObject',
      name: video.title,
      description: video.description ?? video.title,
      uploadDate: video.uploadDate,
      thumbnailUrl: toAbsoluteUrl(video.poster.src),
    }),
  );
}

const PAGE_SCHEMAS: Partial<Record<PageKey, () => (StructuredData | null)[]>> = {
  home: () => [buildOrganization(), buildWebSite()],
  napoleonHill: () => [buildNapoleonHill(), ...buildBooks()],
  jamil: () => [buildJamil()],
  materials: () => buildBooks(),
  videos: () => buildVideos(),
};

export function buildStructuredData(key: PageKey): StructuredData | null {
  const graph = [...(PAGE_SCHEMAS[key]?.() ?? []), buildBreadcrumbs(key)].filter(
    (schema): schema is StructuredData => schema !== null,
  );
  if (!graph.length) {
    return null;
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
