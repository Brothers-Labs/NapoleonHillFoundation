/*
 * Single source of truth for per-route SEO metadata. Keep this file free of runtime imports:
 * `scripts/generate-seo-files.mts` loads it directly to build the sitemap.
 */

export type PageKey =
  | 'home'
  | 'napoleonHill'
  | 'foundation'
  | 'philosophy'
  | 'brazil'
  | 'jamil'
  | 'programs'
  | 'gallery'
  | 'videos'
  | 'materials'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'notFound';

export interface PageMetadata {
  /** Path without leading slash; empty string for the home page. */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly breadcrumb: string;
  readonly indexable: boolean;
  readonly changeFrequency: 'weekly' | 'monthly' | 'yearly';
  readonly priority: number;
}

export const PAGE_METADATA: Readonly<Record<PageKey, PageMetadata>> = {
  home: {
    path: '',
    title: 'Napoleon Hill Brasil | The Napoleon Hill Foundation',
    description:
      'Conheça o legado, a filosofia e os princípios de Napoleon Hill no Brasil, além de conteúdos, programas e iniciativas relacionados à Napoleon Hill Foundation.',
    breadcrumb: 'Início',
    indexable: true,
    changeFrequency: 'weekly',
    priority: 1,
  },
  napoleonHill: {
    path: 'napoleon-hill',
    title: 'Quem foi Napoleon Hill | Napoleon Hill Brasil',
    description:
      'A trajetória de Napoleon Hill, autor de Think and Grow Rich (Quem Pensa Enriquece), e a obra que atravessou gerações.',
    breadcrumb: 'Napoleon Hill',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  foundation: {
    path: 'fundacao',
    title: 'The Napoleon Hill Foundation | Napoleon Hill Brasil',
    description:
      'A instituição dedicada a preservar o legado de Napoleon Hill e a inspirar novas gerações por meio da educação.',
    breadcrumb: 'A Fundação',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  philosophy: {
    path: 'filosofia',
    title: 'Filosofia e princípios de Napoleon Hill | Napoleon Hill Brasil',
    description:
      'Os princípios do sucesso de Napoleon Hill: uma filosofia de realização pessoal, liderança e propósito.',
    breadcrumb: 'Filosofia',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  brazil: {
    path: 'brasil',
    title: 'Napoleon Hill no Brasil | Napoleon Hill Brasil',
    description:
      'O legado de Napoleon Hill apresentado para uma nova geração de leitores, empreendedores e líderes no Brasil.',
    breadcrumb: 'Brasil',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  jamil: {
    path: 'jamil-albuquerque',
    title: 'Jamil Albuquerque | Napoleon Hill Brasil',
    description: 'Jamil Albuquerque e o legado de Napoleon Hill no Brasil.',
    breadcrumb: 'Jamil Albuquerque',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  programs: {
    path: 'programas',
    title: 'Programas | Napoleon Hill Brasil',
    description:
      'Programas, treinamentos e eventos para transformar a filosofia de Napoleon Hill em ação.',
    breadcrumb: 'Programas',
    indexable: true,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  gallery: {
    path: 'galeria',
    title: 'Galeria | Napoleon Hill Brasil',
    description: 'Momentos que inspiram e transformam: eventos, treinamentos e palestras.',
    breadcrumb: 'Galeria',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  videos: {
    path: 'videos',
    title: 'Vídeos | Napoleon Hill Brasil',
    description: 'Assista, aprenda e aplique: vídeos sobre a filosofia de Napoleon Hill.',
    breadcrumb: 'Vídeos',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  materials: {
    path: 'materiais',
    title: 'Livros e materiais | Napoleon Hill Brasil',
    description:
      'As obras de Napoleon Hill e materiais para continuar a sua jornada de conhecimento.',
    breadcrumb: 'Livros e materiais',
    indexable: true,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  contact: {
    path: 'contato',
    title: 'Contato | Napoleon Hill Brasil',
    description: 'Fale com a equipe da Napoleon Hill Brasil.',
    breadcrumb: 'Contato',
    indexable: true,
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  privacy: {
    path: 'privacidade',
    title: 'Política de Privacidade | Napoleon Hill Brasil',
    description:
      'Como tratamos dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
    breadcrumb: 'Privacidade',
    indexable: true,
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  terms: {
    path: 'termos',
    title: 'Termos de uso | Napoleon Hill Brasil',
    description: 'Condições de uso do site da Napoleon Hill Brasil.',
    breadcrumb: 'Termos de uso',
    indexable: true,
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  notFound: {
    path: '404',
    title: 'Página não encontrada | Napoleon Hill Brasil',
    description: 'A página que você procura não está disponível.',
    breadcrumb: 'Página não encontrada',
    indexable: false,
    changeFrequency: 'yearly',
    priority: 0,
  },
};
