import type { SectionCopy } from '../core/models/content.model';
import type { Material } from '../core/models/catalog.model';
import type { GalleryCategory, GalleryItem, VideoItem } from '../core/models/media.model';

export const GALLERY_COPY: SectionCopy = {
  eyebrow: 'Galeria',
  title: 'Momentos que inspiram e transformam.',
};

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  { id: 'events', label: 'Eventos' },
  { id: 'trainings', label: 'Treinamentos' },
  { id: 'lectures', label: 'Palestras' },
  { id: 'institutional', label: 'Institucional' },
];

/*
 * TODO: receber fotografias reais e autorizadas. `category` deve referenciar um id acima.
 * Exemplo: { id: 'evento-2026', category: 'events', caption: '<legenda>', image: { src, alt, width, height } }
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [];

export const VIDEOS_COPY: SectionCopy = {
  eyebrow: 'Vídeos',
  title: 'Assista. Aprenda. Aplique.',
};

/*
 * TODO: cadastrar vídeos oficiais (YouTube, Vimeo ou arquivo próprio).
 * Exemplo: { id: 'abertura', title: '<título>', category: 'Palestras', duration: '12:40',
 *   poster: { src, alt, width, height }, source: { provider: 'youtube', videoId: '<id>' } }
 */
export const VIDEOS: readonly VideoItem[] = [];

/** Institutional film shown from the hero. While `null`, the hero offers a different CTA. */
// TODO: configurar o vídeo institucional oficial, se existir.
export const FEATURED_VIDEO: VideoItem | null = null;

export const MATERIALS_COPY: SectionCopy = {
  eyebrow: 'Materiais',
  title: 'Conhecimento para continuar sua jornada.',
};

/*
 * TODO: cadastrar somente materiais autorizados, hospedados em `public/materials/` ou em CDN.
 * Exemplo: { id: 'guia', type: 'guide', name: '<nome>', description: '<descrição>',
 *   format: 'PDF · 2,4 MB', cover: null, fileUrl: '/materials/<arquivo>.pdf' }
 */
export const MATERIALS: readonly Material[] = [];
