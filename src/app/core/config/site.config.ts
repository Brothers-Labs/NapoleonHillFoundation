import type { ImageAsset } from '../models/content.model';

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly footerMessage: string;
  readonly locale: string;
  readonly language: string;
  /**
   * Public origin without trailing slash. While `null`, canonical URLs, absolute OpenGraph URLs
   * and the sitemap are not emitted, because publishing a guessed domain would mislead crawlers.
   */
  readonly siteUrl: string | null;
  /** Official logo. While `null`, the institutional name is rendered as plain text. */
  readonly logo: ImageAsset | null;
  readonly defaultShareImage: ImageAsset | null;
  readonly internationalFoundationUrl: string | null;
  readonly searchConsoleVerification: string | null;
  /** Legal entity responsible for the site, used by the privacy policy and the copyright line. */
  readonly legalEntityName: string | null;
}

/*
 * This file must keep type-only imports: `scripts/generate-seo-files.mts` loads it directly
 * through Node.js type stripping to build the sitemap.
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'The Napoleon Hill Foundation Brasil',
  shortName: 'Napoleon Hill Brasil',
  tagline: 'O legado continua.',
  footerMessage: 'Preservando um legado. Inspirando novas gerações.',
  locale: 'pt_BR',
  language: 'pt-BR',
  // TODO: definir o domínio oficial de produção antes da publicação.
  siteUrl: null,
  // TODO: receber o logo oficial (SVG) aprovado pela fundação. Não redesenhar.
  logo: null,
  // TODO: definir imagem oficial de compartilhamento (1200x630).
  defaultShareImage: null,
  // TODO: validar com Jamil Albuquerque antes da publicação.
  internationalFoundationUrl: 'https://www.naphill.org',
  // TODO: inserir o token de verificação do Google Search Console.
  searchConsoleVerification: null,
  // TODO: validar com Jamil Albuquerque a razão social responsável pelo site.
  legalEntityName: null,
};
