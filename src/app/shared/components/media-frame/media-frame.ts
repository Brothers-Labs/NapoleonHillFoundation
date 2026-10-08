import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { ImageAsset } from '../../../core/models/content.model';

export type MediaAspect = 'portrait' | 'landscape' | 'square';

/**
 * Displays an authorized image, or, while none is configured, an archival-style placeholder.
 * The placeholder is intentionally typographic: it never imitates a real photograph or person.
 */
@Component({
  selector: 'nh-media-frame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-aspect]': 'aspect()' },
  templateUrl: './media-frame.html',
  styleUrl: './media-frame.scss',
})
export class MediaFrame {
  readonly image = input<ImageAsset | null>(null);
  readonly aspect = input<MediaAspect>('portrait');
  readonly sizes = input('(min-width: 1024px) 50vw, 100vw');
  readonly isPriority = input(false);
  /** Initials or short mark shown in the placeholder. */
  readonly monogram = input('');
  readonly placeholderCaption = input.required<string>();
}
