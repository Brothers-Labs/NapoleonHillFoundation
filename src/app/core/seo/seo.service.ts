import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title, type MetaDefinition } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';
import { PAGE_METADATA, type PageKey } from './page-metadata';
import { buildStructuredData, toAbsoluteUrl } from './structured-data';

const STRUCTURED_DATA_ID = 'nh-structured-data';

export const PAGE_DATA_KEY = 'page';

function isPageKey(value: unknown): value is PageKey {
  return typeof value === 'string' && value in PAGE_METADATA;
}

function deepestChild(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let current = snapshot;
  while (current.firstChild) {
    current = current.firstChild;
  }
  return current;
}

/**
 * Applies per-route metadata (title, description, canonical, OpenGraph, Twitter Card and
 * JSON-LD). It runs on the server during prerender, so every route ships complete metadata in
 * its static HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const key: unknown = deepestChild(this.router.routerState.snapshot.root).data[
          PAGE_DATA_KEY
        ];
        this.apply(isPageKey(key) ? key : 'notFound');
      });
  }

  apply(key: PageKey): void {
    const page = PAGE_METADATA[key];
    const url = toAbsoluteUrl(page.path);
    const shareImage = SITE_CONFIG.defaultShareImage;
    const shareImageUrl = shareImage ? toAbsoluteUrl(shareImage.src) : null;

    this.title.setTitle(page.title);
    this.setTags([
      { name: 'description', content: page.description },
      {
        name: 'robots',
        content: page.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_CONFIG.name },
      { property: 'og:locale', content: SITE_CONFIG.locale },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { name: 'twitter:card', content: shareImageUrl ? 'summary_large_image' : 'summary' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
    ]);

    this.setOptionalTag({ property: 'og:url' }, url);
    this.setOptionalTag({ property: 'og:image' }, shareImageUrl);
    this.setOptionalTag({ property: 'og:image:alt' }, shareImageUrl ? shareImage?.alt : null);
    this.setOptionalTag({ name: 'twitter:image' }, shareImageUrl);
    this.setOptionalTag(
      { name: 'google-site-verification' },
      SITE_CONFIG.searchConsoleVerification,
    );
    this.setCanonical(url);
    this.setStructuredData(key);
  }

  private setTags(tags: readonly MetaDefinition[]): void {
    for (const tag of tags) {
      this.meta.updateTag(tag);
    }
  }

  private setOptionalTag(
    selector: { readonly name: string } | { readonly property: string },
    content: string | null | undefined,
  ): void {
    const attribute =
      'name' in selector ? `name="${selector.name}"` : `property="${selector.property}"`;
    if (content) {
      this.meta.updateTag({ ...selector, content });
    } else {
      this.meta.removeTag(attribute);
    }
  }

  private setCanonical(url: string | null): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!url) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setStructuredData(key: PageKey): void {
    this.document.getElementById(STRUCTURED_DATA_ID)?.remove();
    const data = buildStructuredData(key);
    if (!data) {
      return;
    }
    const script = this.document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    // Escaping "<" prevents a value containing "</script>" from breaking out of the tag.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }
}
