/**
 * Shared content primitives. Every institutional dataset is typed against these models so the
 * content layer can later be swapped for a CMS or an API without touching components.
 */

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Optional responsive candidates, e.g. `"/img/hill-800.avif 800w, /img/hill-1600.avif 1600w"`. */
  readonly srcset?: string;
  /** Rights holder or archive reference, displayed as a caption when present. */
  readonly credit?: string;
}

interface BaseAction {
  readonly label: string;
}

export interface RouteAction extends BaseAction {
  readonly kind: 'route';
  readonly route: string;
  readonly fragment?: string;
}

export interface ExternalAction extends BaseAction {
  readonly kind: 'external';
  readonly href: string;
}

export type ContentAction = RouteAction | ExternalAction;

export interface SectionCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead?: string;
}

export interface Paragraphs {
  readonly paragraphs: readonly string[];
}
