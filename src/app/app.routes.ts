import type { Routes } from '@angular/router';
import { PAGE_METADATA, type PageKey } from './core/seo/page-metadata';
import { PAGE_DATA_KEY } from './core/seo/seo.service';

const pageData = (page: PageKey) => ({ [PAGE_DATA_KEY]: page });

/** Every page is lazy-loaded and prerendered; paths come from the shared SEO metadata. */
export const routes: Routes = [
  {
    path: PAGE_METADATA.home.path,
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
    data: pageData('home'),
  },
  {
    path: PAGE_METADATA.napoleonHill.path,
    loadComponent: () =>
      import('./features/napoleon-hill/napoleon-hill-page').then((m) => m.NapoleonHillPage),
    data: pageData('napoleonHill'),
  },
  {
    path: PAGE_METADATA.foundation.path,
    loadComponent: () =>
      import('./features/foundation/foundation-page').then((m) => m.FoundationPage),
    data: pageData('foundation'),
  },
  {
    path: PAGE_METADATA.philosophy.path,
    loadComponent: () =>
      import('./features/philosophy/philosophy-page').then((m) => m.PhilosophyPage),
    data: pageData('philosophy'),
  },
  {
    path: PAGE_METADATA.brazil.path,
    loadComponent: () => import('./features/brazil/brazil-page').then((m) => m.BrazilPage),
    data: pageData('brazil'),
  },
  {
    path: PAGE_METADATA.jamil.path,
    loadComponent: () => import('./features/jamil/jamil-page').then((m) => m.JamilPage),
    data: pageData('jamil'),
  },
  {
    path: PAGE_METADATA.programs.path,
    loadComponent: () => import('./features/programs/programs-page').then((m) => m.ProgramsPage),
    data: pageData('programs'),
  },
  {
    path: PAGE_METADATA.gallery.path,
    loadComponent: () => import('./features/gallery/gallery-page').then((m) => m.GalleryPage),
    data: pageData('gallery'),
  },
  {
    path: PAGE_METADATA.videos.path,
    loadComponent: () => import('./features/videos/videos-page').then((m) => m.VideosPage),
    data: pageData('videos'),
  },
  {
    path: PAGE_METADATA.materials.path,
    loadComponent: () => import('./features/materials/materials-page').then((m) => m.MaterialsPage),
    data: pageData('materials'),
  },
  {
    path: PAGE_METADATA.contact.path,
    loadComponent: () => import('./features/contact/contact-page').then((m) => m.ContactPage),
    data: pageData('contact'),
  },
  {
    path: PAGE_METADATA.privacy.path,
    loadComponent: () => import('./features/legal/privacy-page').then((m) => m.PrivacyPage),
    data: pageData('privacy'),
  },
  {
    path: PAGE_METADATA.terms.path,
    loadComponent: () => import('./features/legal/terms-page').then((m) => m.TermsPage),
    data: pageData('terms'),
  },
  {
    // Prerendered as /404/index.html so static hosts can serve it for unknown URLs.
    path: PAGE_METADATA.notFound.path,
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
    data: pageData('notFound'),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
    data: pageData('notFound'),
  },
];
