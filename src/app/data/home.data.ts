import type { ImageAsset, SectionCopy } from '../core/models/content.model';

export interface HeroContent {
  readonly eyebrow: readonly string[];
  readonly headline: readonly [string, string];
  readonly subheadline: string;
  readonly scrollCue: string;
  readonly image: ImageAsset | null;
}

// Historical photograph of a young Napoleon Hill, supplied on 2026-10-08.
export const HERO_CONTENT: HeroContent = {
  eyebrow: ['The Napoleon Hill Foundation', 'Brasil'],
  headline: ['O sucesso', 'começa na mente.'],
  subheadline:
    'O legado de Napoleon Hill, agora apresentado oficialmente para uma nova geração no Brasil.',
  scrollCue: 'Descubra o legado',
  image: {
    src: '/images/hero/napoleon-hill-young-portrait.jpg',
    alt: '',
    width: 688,
    height: 540,
  },
};

export interface ClosingContent {
  readonly title: string;
  readonly lead: string;
}

export const CLOSING_CONTENT: ClosingContent = {
  title: 'O legado continua.',
  lead: 'Conhecimento só transforma quando se torna ação.',
};

export const NEWSLETTER_COPY: SectionCopy = {
  eyebrow: 'Newsletter',
  title: 'Comece sua jornada hoje.',
  lead: 'Receba conteúdos exclusivos sobre os princípios de Napoleon Hill, eventos e novidades no Brasil.',
};

export const CONTACT_COPY: SectionCopy = {
  eyebrow: 'Contato',
  title: 'Fale conosco.',
  lead: 'Estamos prontos para ajudar.',
};
