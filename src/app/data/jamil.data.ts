import type { ImageAsset } from '../core/models/content.model';

export interface ProfileStat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface PersonProfile {
  readonly eyebrow: string;
  readonly givenName: string;
  readonly familyName: string;
  readonly subtitle: string;
  /** Official professional portrait. Never replaced by a generated or stock image. */
  readonly portrait: ImageAsset | null;
  /** Larger portrait used on the dedicated page. */
  readonly pagePortrait: ImageAsset | null;
  readonly summary: readonly string[];
  readonly biography: readonly string[];
  readonly role: string | null;
  readonly stats: readonly ProfileStat[];
  readonly quote: string | null;
}

/*
 * Copy, numbers and portraits follow the visual mock delivered on 2026-10-07.
 * TODO: validar com Jamil Albuquerque antes da publicação: biografia, números e a autoria da frase.
 * TODO: confirmar que os retratos são fotografias reais de Jamil Albuquerque e substituí-los pelos
 *       arquivos originais em alta resolução. Se forem ilustrações geradas, removê-los (portrait: null).
 */
export const JAMIL_PROFILE: PersonProfile = {
  eyebrow: 'O legado no Brasil',
  givenName: 'Jamil',
  familyName: 'Albuquerque',
  subtitle: 'O legado de Napoleon Hill no Brasil.',
  portrait: {
    src: '/images/jamil/jamil-albuquerque.jpg',
    alt: 'Jamil Albuquerque de terno escuro, sorrindo, com os braços cruzados.',
    width: 205,
    height: 182,
  },
  pagePortrait: {
    src: '/images/jamil/jamil-albuquerque-portrait.jpg',
    alt: 'Retrato de Jamil Albuquerque de terno escuro em fundo escuro.',
    width: 194,
    height: 199,
  },
  summary: [
    'Há mais de três décadas dedicando sua vida ao estudo e à aplicação dos princípios de Napoleon Hill.',
    'Sua missão é levar esse conhecimento para transformar pessoas, empresas e comunidades.',
  ],
  biography: [
    'Fundador da Master Mind – Treinamentos de Alta Performance, organização licenciada oficialmente pela Napoleon Hill Foundation.',
  ],
  role: 'Fundador da Master Mind – Treinamentos de Alta Performance',
  stats: [
    { id: 'years', value: '30+', label: 'Anos de dedicação' },
    { id: 'lives', value: 'Milhares', label: 'Vidas impactadas' },
    { id: 'events', value: '100+', label: 'Eventos realizados' },
    { id: 'mission', value: '1', label: 'Missão: transformar pessoas' },
  ],
  quote: 'O sucesso não é sorte. É um processo que pode ser aprendido e aplicado.',
};
