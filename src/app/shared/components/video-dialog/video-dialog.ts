import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import type { VideoItem } from '../../../core/models/media.model';
import { buildVideoEmbedUrl } from '../../../core/utils/video-embed';
import { Dialog } from '../dialog/dialog';

/**
 * Plays a configured video in a modal. The iframe is created only after the visitor asks for
 * it, so no third-party player weighs on the initial page load.
 */
@Component({
  selector: 'nh-video-dialog',
  imports: [Dialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-dialog
      variant="media"
      labelledBy="video-dialog-title"
      [open]="isOpen()"
      (openChange)="onOpenChange($event)"
    >
      @if (video(); as current) {
        @let source = current.source;
        <div class="player">
          @if (source.provider === 'file') {
            <video controls autoplay playsinline [poster]="current.poster.src">
              <source [src]="source.src" [type]="source.mimeType" />
            </video>
          } @else if (embedUrl(); as url) {
            <iframe
              [src]="url"
              [title]="current.title"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
          } @else {
            <p class="player__error">Não foi possível carregar este vídeo.</p>
          }
        </div>
        <h2 id="video-dialog-title" class="caption">{{ current.title }}</h2>
      }
    </nh-dialog>
  `,
  styles: `
    .player {
      position: relative;
      aspect-ratio: 16 / 9;
      background: var(--nh-black);
      box-shadow: var(--nh-shadow-deep);

      iframe,
      video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    .player__error {
      display: grid;
      place-items: center;
      height: 100%;
      color: var(--nh-text-muted);
    }

    .caption {
      margin-top: var(--nh-space-4);
      font-size: var(--nh-text-xl);
    }
  `,
})
export class VideoDialog {
  readonly video = model<VideoItem | null>(null);

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly isOpen = computed(() => this.video() !== null);

  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const current = this.video();
    const url = current ? buildVideoEmbedUrl(current.source) : null;
    // Safe to trust: buildVideoEmbedUrl only returns fixed provider origins with validated IDs.
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });

  protected onOpenChange(isOpen: boolean): void {
    if (!isOpen) {
      this.video.set(null);
    }
  }
}
