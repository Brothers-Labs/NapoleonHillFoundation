import type { SectionCopy } from '../core/models/content.model';
import type { Book } from '../core/models/catalog.model';

export const BOOKS_COPY: SectionCopy = {
  eyebrow: 'Livros e obras',
  title: 'Ideias que atravessaram gerações.',
  lead: 'Obras que organizaram, em linguagem acessível, décadas de estudo sobre a realização humana.',
};

/*
 * TODO: validar com Jamil Albuquerque antes da publicação: obras autorizadas para este projeto,
 * títulos das edições brasileiras, capas licenciadas e links para edições oficiais.
 * Nunca disponibilizar PDFs de obras protegidas.
 */
export const BOOKS: readonly Book[] = [
  {
    id: 'the-law-of-success',
    originalTitle: 'The Law of Success',
    portugueseTitle: 'A Lei do Triunfo',
    year: 1928,
    description:
      'A primeira sistematização da filosofia de Hill, organizada em lições sobre os fundamentos da realização.',
    cover: null,
    action: null,
  },
  {
    id: 'think-and-grow-rich',
    originalTitle: 'Think and Grow Rich',
    portugueseTitle: 'Quem Pensa Enriquece',
    year: 1937,
    description:
      'A obra mais conhecida do autor, que condensa sua filosofia em princípios práticos para transformar desejo em realização.',
    cover: null,
    action: null,
  },
  {
    id: 'outwitting-the-devil',
    originalTitle: 'Outwitting the Devil',
    portugueseTitle: 'Mais Esperto que o Diabo',
    year: 2011,
    description:
      'Escrito em 1938 e publicado apenas décadas depois, examina o medo e a indecisão como obstáculos à liberdade de pensamento.',
    cover: null,
    action: null,
  },
];
