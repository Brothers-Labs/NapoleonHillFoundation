import type { IconName } from '../../shared/components/icon/icon';
import type { FooterColumn, NavigationEntry, NavigationLink } from '../models/navigation.model';

const link = (
  id: string,
  label: string,
  route: string,
  options: Pick<NavigationLink, 'fragment' | 'sectionId'> = {},
): NavigationLink => ({ kind: 'link', id, label, route, ...options });

export const CONTENT_LINKS: readonly NavigationLink[] = [
  link('books', 'Livros e materiais', '/materiais'),
  link('videos', 'Vídeos', '/videos'),
  link('gallery', 'Galeria', '/galeria'),
];

export const HEADER_NAVIGATION: readonly NavigationEntry[] = [
  link('home', 'Início', '/', { sectionId: 'inicio' }),
  link('foundation', 'A Fundação', '/fundacao', { sectionId: 'fundacao' }),
  link('napoleon-hill', 'Napoleon Hill', '/napoleon-hill', { sectionId: 'napoleon-hill' }),
  link('philosophy', 'Filosofia', '/filosofia', { sectionId: 'filosofia' }),
  link('brazil', 'Brasil', '/brasil', { sectionId: 'brasil' }),
  link('jamil', 'Jamil Albuquerque', '/jamil-albuquerque', { sectionId: 'jamil-albuquerque' }),
  {
    kind: 'group',
    id: 'contents',
    label: 'Conteúdos',
    route: '/materiais',
    children: CONTENT_LINKS,
  },
  link('contact', 'Contato', '/contato', { sectionId: 'contato' }),
];

/** The mobile menu follows the narrative order of the home page rather than the desktop order. */
export const MOBILE_NAVIGATION: readonly NavigationEntry[] = [
  link('home', 'Início', '/'),
  link('napoleon-hill', 'Napoleon Hill', '/napoleon-hill'),
  link('foundation', 'A Fundação', '/fundacao'),
  link('philosophy', 'Filosofia', '/filosofia'),
  link('brazil', 'Brasil', '/brasil'),
  link('jamil', 'Jamil Albuquerque', '/jamil-albuquerque'),
  link('programs', 'Programas', '/programas'),
  {
    kind: 'group',
    id: 'contents',
    label: 'Conteúdos',
    route: '/materiais',
    children: CONTENT_LINKS,
  },
  link('contact', 'Contato', '/contato'),
];

export const PRIMARY_CALL_TO_ACTION: NavigationLink = link(
  'programs-cta',
  'Conheça nossos programas',
  '/programas',
);

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    id: 'navigation',
    title: 'Navegação',
    links: [
      link('home', 'Início', '/'),
      link('foundation', 'A Fundação', '/fundacao'),
      link('napoleon-hill', 'Napoleon Hill', '/napoleon-hill'),
      link('philosophy', 'Filosofia', '/filosofia'),
      link('brazil', 'Brasil', '/brasil'),
      link('jamil', 'Jamil Albuquerque', '/jamil-albuquerque'),
      link('programs', 'Programas', '/programas'),
      link('contact', 'Contato', '/contato'),
    ],
  },
  {
    id: 'contents',
    title: 'Conteúdos',
    links: [
      link('books', 'Livros', '/materiais', { fragment: 'livros' }),
      link('videos', 'Vídeos', '/videos'),
      link('gallery', 'Galeria', '/galeria'),
      link('materials', 'Materiais', '/materiais', { fragment: 'materiais' }),
    ],
  },
];

export const LEGAL_LINKS: readonly NavigationLink[] = [
  link('privacy', 'Política de Privacidade', '/privacidade'),
  link('terms', 'Termos de uso', '/termos'),
];

export interface TabBarItem {
  readonly link: NavigationLink;
  readonly icon: IconName;
}

/** Thumb-reachable shortcuts shown in the fixed bottom bar on phones. */
export const MOBILE_TAB_BAR: readonly TabBarItem[] = [
  { link: link('home', 'Início', '/'), icon: 'home' },
  { link: link('philosophy', 'Filosofia', '/filosofia'), icon: 'compass' },
  { link: link('programs', 'Programas', '/programas'), icon: 'book-open' },
  { link: link('videos', 'Vídeos', '/videos'), icon: 'video' },
  { link: link('contact', 'Contato', '/contato'), icon: 'mail' },
];
