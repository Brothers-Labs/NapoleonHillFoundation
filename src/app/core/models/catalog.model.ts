import type { IconName } from '../../shared/components/icon/icon';
import type { ContentAction, ImageAsset } from './content.model';

export interface Program {
  readonly id: string;
  readonly category: string;
  readonly name: string;
  readonly description: string;
  readonly icon: IconName;
  readonly image: ImageAsset | null;
  readonly action: ContentAction;
}

export interface Book {
  readonly id: string;
  readonly originalTitle: string;
  /** Title of the Brazilian edition, when one exists. */
  readonly portugueseTitle: string | null;
  readonly year: number;
  readonly description: string;
  readonly cover: ImageAsset | null;
  /** Where to find an authorized edition. Never a link to a protected PDF. */
  readonly action: ContentAction | null;
}

export type MaterialType = 'ebook' | 'guide' | 'article' | 'checklist' | 'event-material';

export interface Material {
  readonly id: string;
  readonly type: MaterialType;
  readonly name: string;
  readonly description: string;
  /** File format label such as `"PDF · 2,4 MB"`. */
  readonly format: string;
  readonly cover: ImageAsset | null;
  readonly fileUrl: string;
}
