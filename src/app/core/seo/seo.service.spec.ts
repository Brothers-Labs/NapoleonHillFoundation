import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PAGE_METADATA } from './page-metadata';
import { SeoService } from './seo.service';
import { buildStructuredData } from './structured-data';

describe('SeoService', () => {
  const setup = () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    return TestBed.inject(SeoService);
  };

  const meta = (selector: string) =>
    document.head.querySelector(`meta[${selector}]`)?.getAttribute('content');

  it('applies title, description, robots and OpenGraph tags', () => {
    setup().apply('philosophy');

    expect(document.title).toBe(PAGE_METADATA.philosophy.title);
    expect(meta('name="description"')).toBe(PAGE_METADATA.philosophy.description);
    expect(meta('name="robots"')).toContain('index');
    expect(meta('property="og:title"')).toBe(PAGE_METADATA.philosophy.title);
    expect(meta('name="twitter:card"')).toBe('summary');
  });

  it('marks the not-found page as noindex', () => {
    setup().apply('notFound');
    expect(meta('name="robots"')).toBe('noindex, follow');
  });

  it('does not invent a canonical URL while the domain is unknown', () => {
    setup().apply('home');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('emits a single JSON-LD block and replaces it on navigation', () => {
    const seo = setup();
    seo.apply('home');
    seo.apply('napoleonHill');

    const blocks = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(blocks.length).toBe(1);
    expect(blocks[0]?.textContent).toContain('"@type":"Person"');
  });
});

describe('buildStructuredData', () => {
  it('publishes a Person schema for Jamil only from the configured biography', () => {
    const data = JSON.stringify(buildStructuredData('jamil'));
    expect(data).toContain('"@type":"Person"');
    expect(data).toContain('Jamil Albuquerque');
  });

  it('describes the books on the materials page', () => {
    const data = JSON.stringify(buildStructuredData('materials'));
    expect(data).toContain('"@type":"Book"');
    expect(data).toContain('Think and Grow Rich');
  });
});
