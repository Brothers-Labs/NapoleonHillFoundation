import type { ImageAsset, SectionCopy } from '../core/models/content.model';
import type { IconName } from '../shared/components/icon/icon';

export interface InstitutionalPillar {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface FoundationContent {
  readonly copy: SectionCopy;
  readonly paragraphs: readonly string[];
  /** Short checklist shown next to the building image. */
  readonly highlights: readonly string[];
  readonly image: ImageAsset;
  readonly mission: {
    readonly title: string;
    readonly text: string;
    readonly image: ImageAsset;
  };
  readonly pillars: readonly InstitutionalPillar[];
  readonly pageImage: ImageAsset;
}

export interface Representative {
  readonly name: string;
  readonly description: string;
}

export interface BrazilContent {
  readonly copy: SectionCopy;
  readonly titleAccent: string;
  readonly paragraphs: readonly string[];
  readonly representative: Representative | null;
  readonly image: ImageAsset;
}

/*
 * Copy and imagery follow the visual mock delivered on 2026-10-07.
 * TODO: validar com Jamil Albuquerque antes da publicação (missão, iniciativas e imagens).
 * TODO: substituir as imagens recortadas do mock pelos arquivos originais em alta resolução.
 */
export const FOUNDATION_CONTENT: FoundationContent = {
  copy: {
    eyebrow: 'The Napoleon Hill Foundation',
    title: 'Preservando um legado. Inspirando novas gerações.',
  },
  paragraphs: [
    'Organização educacional sem fins lucrativos dedicada a preservar e perpetuar a filosofia de Napoleon Hill em todo o mundo.',
  ],
  highlights: [
    'Educação e liderança',
    'Programas e certificações',
    'Preservação do legado',
    'Impacto global',
  ],
  image: {
    src: '/images/foundation/foundation-building.jpg',
    alt: 'Fachada neoclássica com colunas e a placa The Napoleon Hill Foundation.',
    width: 245,
    height: 207,
  },
  mission: {
    title: 'Nossa missão',
    text: 'Perpetuar a filosofia de liderança, automotivação e realização individual desenvolvida por Napoleon Hill, através de educação, pesquisa e materiais de alta qualidade.',
    image: {
      src: '/images/foundation/law-of-success-compass.jpg',
      alt: 'Bússola antiga sobre um exemplar de The Law of Success.',
      width: 182,
      height: 110,
    },
  },
  pillars: [
    {
      id: 'education',
      title: 'Educação',
      description: 'Programas e treinamentos para todo o mundo.',
      icon: 'graduation',
    },
    {
      id: 'research',
      title: 'Pesquisa',
      description: 'Estudos e preservação do legado.',
      icon: 'search',
    },
    {
      id: 'materials',
      title: 'Materiais',
      description: 'Livros, cursos e conteúdos autorizados.',
      icon: 'book-open',
    },
    {
      id: 'impact',
      title: 'Impacto',
      description: 'Transformando vidas e organizações.',
      icon: 'heart',
    },
  ],
  pageImage: {
    src: '/images/foundation/napoleon-hill-bust.jpg',
    alt: 'Busto de Napoleon Hill entre livros antigos.',
    width: 172,
    height: 130,
  },
};

export const BRAZIL_CONTENT: BrazilContent = {
  copy: {
    eyebrow: 'Representação oficial',
    title: 'Napoleon Hill',
    lead: 'O legado de Napoleon Hill encontra uma nova geração.',
  },
  titleAccent: 'no Brasil',
  paragraphs: ['A filosofia de Napoleon Hill possui representação oficial no Brasil.'],
  // TODO: validar com Jamil Albuquerque a terminologia do licenciamento antes da publicação.
  representative: {
    name: 'Master Mind – Treinamentos de Alta Performance',
    description: 'Organização licenciada oficialmente pela Napoleon Hill Foundation.',
  },
  image: {
    src: '/images/brazil/sao-paulo-bridge.jpg',
    alt: 'Ponte estaiada de São Paulo iluminada à noite.',
    width: 240,
    height: 190,
  },
};
