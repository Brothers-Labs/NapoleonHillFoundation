import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { VideoItem } from '../../../core/models/media.model';
import { VIDEOS, VIDEOS_COPY } from '../../../data/media.data';
import { Icon } from '../../../shared/components/icon/icon';
import { PendingNotice } from '../../../shared/components/pending-notice/pending-notice';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { VideoDialog } from '../../../shared/components/video-dialog/video-dialog';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TrackDirective } from '../../../shared/directives/track.directive';

@Component({
  selector: 'nh-videos-section',
  imports: [Icon, PendingNotice, SectionHeading, VideoDialog, RevealDirective, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="videos nh-section nh-theme-dark" aria-labelledby="videos-title">
      <div class="nh-container nh-container--wide">
        <nh-section-heading class="videos__heading" [copy]="copy" titleId="videos-title" />

        @if (videos.length) {
          <ul class="videos__grid">
            @for (video of videos; track video.id; let index = $index) {
              <li nhReveal [nhRevealDelay]="(index % 3) * 90">
                <button
                  type="button"
                  class="video"
                  aria-haspopup="dialog"
                  nhTrack="video_play"
                  [nhTrackParams]="{ video: video.id }"
                  (click)="playing.set(video)"
                >
                  <span class="video__poster">
                    <img
                      [src]="video.poster.src"
                      [alt]="video.poster.alt"
                      [width]="video.poster.width"
                      [height]="video.poster.height"
                      loading="lazy"
                      decoding="async"
                    />
                    <span class="video__play" aria-hidden="true"><nh-icon name="play" /></span>
                    @if (video.duration) {
                      <span class="video__duration">{{ video.duration }}</span>
                    }
                  </span>
                  <span class="video__category">{{ video.category }}</span>
                  <span class="video__title">{{ video.title }}</span>
                </button>
              </li>
            }
          </ul>
        } @else {
          <nh-pending-notice
            title="Os vídeos oficiais serão publicados em breve."
            description="Palestras, entrevistas e reflexões sobre a filosofia de Napoleon Hill chegarão a este espaço."
            [showContactLink]="false"
          />
        }
      </div>
    </section>

    @if (videos.length) {
      <nh-video-dialog [(video)]="playing" />
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .videos__heading {
      margin-bottom: var(--nh-space-8);
    }

    .videos__grid {
      display: grid;
      gap: var(--nh-space-7) var(--nh-space-5);
      margin: 0;
      padding: 0;
      list-style: none;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1280px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .video {
      display: grid;
      gap: var(--nh-space-2);
      width: 100%;
      padding: 0;
      border: 0;
      background: none;
      color: var(--nh-text);
      text-align: left;

      &:hover .video__play {
        background: var(--nh-gold);
        color: var(--nh-black);
        transform: translate(-50%, -50%) scale(1.06);
      }
    }

    .video__poster {
      position: relative;
      display: block;
      aspect-ratio: 16 / 9;
      margin-bottom: var(--nh-space-3);
      overflow: hidden;
      background: var(--nh-deep-navy);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .video__play {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 4rem;
      height: 4rem;
      border: 1px solid var(--nh-gold);
      border-radius: 50%;
      background: rgb(5 8 12 / 55%);
      color: var(--nh-gold);
      transform: translate(-50%, -50%);
      backdrop-filter: blur(6px);
      transition:
        transform var(--nh-duration-slow) var(--nh-ease-out),
        background-color var(--nh-duration-base),
        color var(--nh-duration-base);
    }

    .video__duration {
      position: absolute;
      right: var(--nh-space-3);
      bottom: var(--nh-space-3);
      padding: 0.15rem var(--nh-space-2);
      background: rgb(5 8 12 / 75%);
      font-size: var(--nh-text-xs);
    }

    .video__category {
      font-size: var(--nh-text-2xs);
      letter-spacing: var(--nh-tracking-eyebrow);
      text-transform: uppercase;
      color: var(--nh-gold);
    }

    .video__title {
      font-family: var(--nh-font-serif);
      font-size: var(--nh-text-xl);
      line-height: 1.25;
    }
  `,
})
export class VideosSection {
  protected readonly copy = VIDEOS_COPY;
  protected readonly videos = VIDEOS;
  protected readonly playing = signal<VideoItem | null>(null);
}
