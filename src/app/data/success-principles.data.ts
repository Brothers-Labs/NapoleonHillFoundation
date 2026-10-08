import type { SectionCopy } from '../core/models/content.model';
import type { SuccessPrinciple } from '../core/models/philosophy.model';

export const PRINCIPLES_COPY: SectionCopy = {
  eyebrow: 'A filosofia',
  title: 'Os princípios do sucesso',
  lead: 'A filosofia de Napoleon Hill é baseada em princípios universais e atemporais.',
};

/*
 * TODO: validar com Jamil Albuquerque antes da publicação.
 * Os nomes em português seguem traduções usuais e precisam ser confirmados contra a
 * terminologia oficial adotada no Brasil. Os resumos são textos editoriais provisórios.
 */
export const SUCCESS_PRINCIPLES: readonly SuccessPrinciple[] = [
  {
    order: 1,
    name: 'Propósito definido',
    originalName: 'Definiteness of Purpose',
    icon: 'target',
    summary: 'Saber com clareza o que se quer alcançar é o ponto de partida de toda realização.',
  },
  {
    order: 2,
    name: 'Aliança Mastermind',
    originalName: 'Mastermind Alliance',
    icon: 'users',
    summary:
      'A cooperação harmoniosa entre duas ou mais mentes, unidas por um propósito comum, multiplica a capacidade de realizar.',
  },
  {
    order: 3,
    name: 'Fé aplicada',
    originalName: 'Applied Faith',
    icon: 'flame',
    summary:
      'Confiança ativa no propósito, sustentada por ação consistente, mesmo diante da incerteza.',
  },
  {
    order: 4,
    name: 'Ir além do esperado',
    originalName: 'Going the Extra Mile',
    summary:
      'Entregar mais e melhor do que o combinado, por iniciativa própria, constrói reputação e abre oportunidades.',
  },
  {
    order: 5,
    name: 'Personalidade atraente',
    originalName: 'Pleasing Personality',
    summary: 'O conjunto de atitudes e hábitos que inspira confiança e facilita a cooperação.',
  },
  {
    order: 6,
    name: 'Iniciativa pessoal',
    originalName: 'Personal Initiative',
    icon: 'trophy',
    summary: 'Agir sem esperar ordens: identificar o que precisa ser feito e fazê-lo.',
  },
  {
    order: 7,
    name: 'Atitude mental positiva',
    originalName: 'Positive Mental Attitude',
    summary:
      'A disposição de encarar cada circunstância em busca do que ela pode ensinar e construir.',
  },
  {
    order: 8,
    name: 'Entusiasmo controlado',
    originalName: 'Controlled Enthusiasm',
    summary: 'Energia canalizada para o propósito, com equilíbrio e direção.',
  },
  {
    order: 9,
    name: 'Autodisciplina',
    originalName: 'Self-Discipline',
    icon: 'compass',
    summary: 'O domínio de si mesmo, que transforma intenção em hábito.',
  },
  {
    order: 10,
    name: 'Pensamento preciso',
    originalName: 'Accurate Thinking',
    summary: 'Separar fatos de opiniões e decidir com base em evidências.',
  },
  {
    order: 11,
    name: 'Atenção controlada',
    originalName: 'Controlled Attention',
    summary: 'Concentrar a energia no que realmente importa para o propósito definido.',
  },
  {
    order: 12,
    name: 'Trabalho em equipe',
    originalName: 'Teamwork',
    summary: 'A cooperação voluntária que torna possível o que ninguém alcançaria sozinho.',
  },
  {
    order: 13,
    name: 'Aprender com a adversidade',
    originalName: 'Learning from Adversity and Defeat',
    summary: 'Toda derrota traz consigo a semente de um benefício equivalente.',
  },
  {
    order: 14,
    name: 'Visão criativa',
    originalName: 'Creative Vision',
    summary: 'A imaginação aplicada para enxergar possibilidades e abrir novos caminhos.',
  },
  {
    order: 15,
    name: 'Saúde física e mental',
    originalName: 'Maintenance of Sound Health',
    summary: 'Cuidar do corpo e da mente como base para sustentar qualquer conquista.',
  },
  {
    order: 16,
    name: 'Orçamento de tempo e dinheiro',
    originalName: 'Budgeting Time and Money',
    summary: 'Administrar com intenção os dois recursos que sustentam qualquer projeto.',
  },
  {
    order: 17,
    name: 'Força cósmica do hábito',
    originalName: 'Cosmic Habitforce',
    summary:
      'O princípio pelo qual pensamentos e ações repetidos se consolidam em hábitos que moldam a vida.',
  },
];

/** Principles highlighted on the home page, in display order (as in the visual mock). */
export const FEATURED_PRINCIPLE_ORDERS: readonly number[] = [1, 2, 3, 9, 6];
