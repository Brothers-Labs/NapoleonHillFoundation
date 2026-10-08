import type { ImageAsset, SectionCopy } from '../core/models/content.model';
import type { LegacyHighlight, TimelineEvent } from '../core/models/philosophy.model';

export interface HistoricalProfile {
  readonly name: string;
  readonly birthDate: string;
  readonly birthPlace: string;
  readonly deathDate: string;
  readonly portrait: ImageAsset | null;
  /** Square portrait for structured data and square layouts. */
  readonly squarePortrait: ImageAsset | null;
  /** Portrait shown in the hero of the dedicated page. */
  readonly pagePortrait: ImageAsset | null;
  readonly intro: SectionCopy;
  /** Short version used on the home page. */
  readonly summary: readonly string[];
  /** Extended version appended on the dedicated page. */
  readonly biography: readonly string[];
}

/*
 * Portraits: historical photographs supplied on 2026-10-08. Copy follows the visual mock of 2026-10-07.
 * TODO: validar com Jamil Albuquerque antes da publicação (textos, números e direitos de uso das fotos).
 */
export const NAPOLEON_HILL_PROFILE: HistoricalProfile = {
  name: 'Napoleon Hill',
  birthDate: '1883-10-26',
  birthPlace: 'Condado de Wise, Virgínia, Estados Unidos',
  deathDate: '1970-11-08',
  portrait: {
    src: '/images/napoleon-hill/napoleon-hill-portrait-bw.webp',
    alt: 'Retrato em preto e branco de Napoleon Hill, de óculos, terno escuro e gravata.',
    width: 480,
    height: 601,
  },
  squarePortrait: {
    src: '/images/napoleon-hill/napoleon-hill-portrait-color.jpg',
    alt: 'Retrato colorido de Napoleon Hill, de óculos e terno escuro, sentado diante de um fundo neutro.',
    width: 447,
    height: 447,
  },
  pagePortrait: {
    src: '/images/napoleon-hill/napoleon-hill-colorized.jpg',
    alt: 'Fotografia colorizada de Napoleon Hill sorrindo, de óculos e terno marrom.',
    width: 489,
    height: 627,
  },
  intro: {
    eyebrow: 'Quem foi',
    title: 'Napoleon Hill?',
  },
  summary: [
    'Napoleon Hill foi um escritor americano que dedicou sua vida a estudar o comportamento humano e o que diferencia as pessoas bem-sucedidas daquelas que não alcançam seus objetivos.',
    'Sua pesquisa, iniciada em 1908, o levou a entrevistar mais de 500 empreendedores e líderes de sucesso. O resultado desse trabalho se tornou um dos livros mais influentes de todos os tempos.',
  ],
  biography: [
    'Nascido em 26 de outubro de 1883, no condado de Wise, na Virgínia, Hill começou a escrever ainda jovem, como repórter. Segundo o próprio autor, foi uma entrevista com o industrial Andrew Carnegie, em 1908, que deu início ao projeto de sua vida.',
    'Nas décadas seguintes, publicou The Law of Success (1928) e Think and Grow Rich (1937), publicado no Brasil como Quem Pensa Enriquece. Morreu em 8 de novembro de 1970, deixando uma obra que continua a ser estudada e aplicada.',
  ],
};

export const LEGACY_HIGHLIGHTS: readonly LegacyHighlight[] = [
  { id: 'lifetime', value: '1883–1970', label: 'Uma vida dedicada ao legado', icon: 'calendar' },
  { id: 'masterwork', value: '1937', label: 'Think and Grow Rich publicado', icon: 'book-open' },
  { id: 'principles', value: '17', label: 'Princípios do sucesso para a vida', icon: 'users' },
  // TODO: validar com Jamil Albuquerque o número de países antes da publicação.
  {
    id: 'global',
    value: 'Presente',
    label: 'Em mais de 160 países ao redor do mundo',
    icon: 'globe',
  },
  { id: 'brazil', value: 'Brasil', label: 'Organização licenciada oficialmente', icon: 'badge' },
];

export const TIMELINE_COPY: SectionCopy = {
  eyebrow: 'A obra',
  title: 'Uma obra que atravessou gerações',
  lead: 'Mais de 100 anos de estudos, livros e ensinamentos que continuam transformando vidas.',
};

export const TIMELINE_IMAGE: ImageAsset = {
  src: '/images/napoleon-hill/think-and-grow-rich.jpg',
  alt: 'Exemplar de Think and Grow Rich com capa verde e letras douradas.',
  width: 285,
  height: 162,
};

export const TIMELINE_EVENTS: readonly TimelineEvent[] = [
  { id: 'research', period: '1908', label: 'Início da pesquisa sobre o sucesso' },
  { id: 'law-of-success', period: '1928', label: 'Publicação de The Law of Success' },
  { id: 'think-and-grow-rich', period: '1937', label: 'Lançamento de Think and Grow Rich' },
  { id: 'today', period: 'Hoje', label: 'O legado continua inspirando o mundo' },
];
