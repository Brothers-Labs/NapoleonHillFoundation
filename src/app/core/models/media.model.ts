import type { ImageAsset } from './content.model';

export type VideoSource =
  | { readonly provider: 'youtube'; readonly videoId: string }
  | { readonly provider: 'vimeo'; readonly videoId: string }
  | {
      readonly provider: 'file';
      readonly src: string;
      readonly mimeType: 'video/mp4' | 'video/webm';
    };

export interface VideoItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  /** Human-readable duration such as `"12:40"`. Omitted when unknown. */
  readonly duration?: string;
  readonly poster: ImageAsset;
  readonly source: VideoSource;
  readonly description?: string;
  /** ISO 8601 publication date. Required to emit `VideoObject` structured data. */
  readonly uploadDate?: string;
}

export interface GalleryItem {
  readonly id: string;
  readonly category: string;
  readonly image: ImageAsset;
  readonly caption?: string;
}

export interface GalleryCategory {
  readonly id: string;
  readonly label: string;
}
