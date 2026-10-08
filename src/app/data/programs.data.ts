import type { SectionCopy } from '../core/models/content.model';
import type { Program } from '../core/models/catalog.model';

export const PROGRAMS_COPY: SectionCopy = {
  eyebrow: 'Programas',
  title: 'Transforme conhecimento em ação',
  lead: 'Programas, treinamentos e experiências para aplicar a filosofia de Napoleon Hill na vida real.',
};

const LEARN_MORE = { kind: 'route', label: 'Quero saber mais', route: '/contato' } as const;

/*
 * Program formats shown in the visual mock delivered on 2026-10-07. Until each format has its own
 * page, the action leads to the contact page instead of a fictitious detail page.
 * TODO: validar com Jamil Albuquerque os formatos oferecidos e criar as páginas de detalhe.
 */
export const PROGRAMS: readonly Program[] = [
  {
    id: 'trainings',
    category: 'Programas',
    name: 'Treinamentos',
    description: 'Imersões e jornadas transformadoras.',
    icon: 'presentation',
    image: null,
    action: LEARN_MORE,
  },
  {
    id: 'courses',
    category: 'Programas',
    name: 'Formações',
    description: 'Conteúdo completo para sua evolução.',
    icon: 'graduation',
    image: null,
    action: LEARN_MORE,
  },
  {
    id: 'events',
    category: 'Programas',
    name: 'Eventos',
    description: 'Encontros que conectam e transformam.',
    icon: 'calendar',
    image: null,
    action: LEARN_MORE,
  },
  {
    id: 'lectures',
    category: 'Programas',
    name: 'Palestras',
    description: 'Inspiração e conhecimento que impactam.',
    icon: 'mic',
    image: null,
    action: LEARN_MORE,
  },
  {
    id: 'masterclasses',
    category: 'Programas',
    name: 'Masterclasses',
    description: 'Aulas exclusivas com especialistas.',
    icon: 'star',
    image: null,
    action: LEARN_MORE,
  },
  {
    id: 'certifications',
    category: 'Programas',
    name: 'Certificações',
    description: 'Validação oficial internacional.',
    icon: 'badge',
    image: null,
    action: LEARN_MORE,
  },
];
