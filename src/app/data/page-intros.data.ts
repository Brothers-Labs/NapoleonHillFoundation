import type { SectionCopy } from '../core/models/content.model';
import type { PageKey } from '../core/seo/page-metadata';

type InternalPageKey = Exclude<PageKey, 'home' | 'notFound'>;

export const PAGE_INTROS: Readonly<Record<InternalPageKey, SectionCopy>> = {
  napoleonHill: {
    eyebrow: 'Napoleon Hill',
    title: 'Uma vida dedicada a entender a realização.',
    lead: 'A trajetória do autor que transformou décadas de estudo em uma filosofia prática.',
  },
  foundation: {
    eyebrow: 'The Napoleon Hill Foundation',
    title: 'A Fundação',
    lead: 'Preservando e disseminando a filosofia de Napoleon Hill em todo o mundo.',
  },
  philosophy: {
    eyebrow: 'Filosofia',
    title: 'Princípios que atravessaram um século.',
    lead: 'Uma filosofia de realização pessoal, liderança e propósito.',
  },
  brazil: {
    eyebrow: 'Brasil',
    title: 'Napoleon Hill no Brasil.',
    lead: 'O legado de Napoleon Hill encontra uma nova geração.',
  },
  jamil: {
    eyebrow: 'O legado no Brasil',
    title: 'Jamil Albuquerque',
    lead: 'O legado de Napoleon Hill no Brasil.',
  },
  programs: {
    eyebrow: 'Programas',
    title: 'Programas e treinamentos',
    lead: 'Transforme conhecimento em ação e construa a vida que sempre sonhou.',
  },
  gallery: {
    eyebrow: 'Galeria',
    title: 'Galeria de fotos',
    lead: 'Momentos que inspiram e transformam.',
  },
  videos: {
    eyebrow: 'Vídeos',
    title: 'Galeria de vídeos',
    lead: 'Assista, aprenda e aplique.',
  },
  materials: {
    eyebrow: 'Livros e materiais',
    title: 'Materiais para download',
    lead: 'Conteúdos para impulsionar sua jornada.',
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Contato',
    lead: 'Fale conosco. Estamos prontos para ajudar.',
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Política de Privacidade',
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Termos de uso',
  },
};
