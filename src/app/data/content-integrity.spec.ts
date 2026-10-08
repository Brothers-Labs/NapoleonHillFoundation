import { HEADER_NAVIGATION, MOBILE_NAVIGATION } from '../core/config/navigation.config';
import { PAGE_METADATA } from '../core/seo/page-metadata';
import { routes } from '../app.routes';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, VIDEOS } from './media.data';
import { TIMELINE_EVENTS } from './napoleon-hill.data';
import { PROGRAMS } from './programs.data';
import { SUCCESS_PRINCIPLES } from './success-principles.data';

/** Guards the hand-edited datasets against mistakes that would surface only in production. */
describe('content integrity', () => {
  it('numbers the principles sequentially from 1', () => {
    expect(SUCCESS_PRINCIPLES.map((principle) => principle.order)).toEqual(
      SUCCESS_PRINCIPLES.map((_, index) => index + 1),
    );
  });

  it('keeps timeline ids unique and years in chronological order', () => {
    const ids = TIMELINE_EVENTS.map((event) => event.id);
    expect(new Set(ids).size).toBe(ids.length);

    const years = TIMELINE_EVENTS.map((event) => Number(event.period)).filter(Number.isFinite);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it('assigns every gallery photo to a declared category', () => {
    const categoryIds = new Set(GALLERY_CATEGORIES.map((category) => category.id));
    for (const item of GALLERY_ITEMS) {
      expect(categoryIds.has(item.category)).toBe(true);
    }
  });

  it('keeps program and video ids unique', () => {
    for (const collection of [PROGRAMS, VIDEOS]) {
      const ids = collection.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('points every navigation link at an existing route', () => {
    const routePaths = new Set(routes.map((route) => `/${route.path ?? ''}`));
    const links = [...HEADER_NAVIGATION, ...MOBILE_NAVIGATION].flatMap((entry) =>
      entry.kind === 'link' ? [entry] : [entry, ...entry.children],
    );
    for (const link of links) {
      expect(routePaths.has(link.route)).toBe(true);
    }
  });

  it('keeps SEO titles and descriptions within search-result limits', () => {
    for (const page of Object.values(PAGE_METADATA)) {
      expect(page.title.length).toBeLessThanOrEqual(70);
      expect(page.description.length).toBeLessThanOrEqual(170);
    }
  });
});
