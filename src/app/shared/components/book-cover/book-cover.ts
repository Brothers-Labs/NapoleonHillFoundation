import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Book } from '../../../core/models/catalog.model';

export type BookCoverTone = 'navy' | 'black' | 'ivory';

/**
 * Licensed cover when available; otherwise a typographic book object. The fallback shows only
 * the title, author and year, so it can never be mistaken for a real edition's artwork.
 */
@Component({
  selector: 'nh-book-cover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-tone]': 'tone()' },
  template: `
    @if (book().cover; as cover) {
      <img
        class="cover__image"
        [src]="cover.src"
        [alt]="cover.alt"
        [width]="cover.width"
        [height]="cover.height"
        loading="lazy"
        decoding="async"
      />
    } @else {
      <div class="cover" aria-hidden="true">
        <span class="cover__spine"></span>
        <span class="cover__author">Napoleon Hill</span>
        <span class="cover__rule"></span>
        <span class="cover__title">{{ book().originalTitle }}</span>
        <span class="cover__year">{{ book().year }}</span>
      </div>
    }
  `,
  styles: `
    :host {
      --cover-background: var(--nh-deep-navy);
      --cover-ink: var(--nh-ivory);

      display: block;
      perspective: 1200px;
    }

    :host([data-tone='black']) {
      --cover-background: var(--nh-black);
    }

    :host([data-tone='ivory']) {
      --cover-background: #ebe4d3;
      --cover-ink: var(--nh-charcoal);
    }

    .cover,
    .cover__image {
      aspect-ratio: 2 / 3;
      width: 100%;
      box-shadow:
        var(--nh-shadow-paper),
        inset 0 0 0 1px rgb(198 161 91 / 25%);
      transition: transform var(--nh-duration-slow) var(--nh-ease-out);
    }

    .cover {
      position: relative;
      display: grid;
      align-content: center;
      justify-items: center;
      gap: var(--nh-space-4);
      padding: var(--nh-space-6) var(--nh-space-5);
      background:
        linear-gradient(100deg, rgb(255 255 255 / 6%), transparent 22%), var(--cover-background);
      color: var(--cover-ink);
      text-align: center;
    }

    .cover__spine {
      position: absolute;
      inset: 0 auto 0 0;
      width: 0.6rem;
      background: linear-gradient(90deg, rgb(0 0 0 / 30%), transparent);
    }

    .cover__author {
      font-size: var(--nh-text-2xs);
      letter-spacing: var(--nh-tracking-eyebrow);
      text-transform: uppercase;
    }

    .cover__rule {
      width: 2rem;
      height: 1px;
      background: var(--nh-gold);
    }

    .cover__title {
      font-family: var(--nh-font-serif);
      font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
      line-height: 1.1;
    }

    .cover__year {
      font-size: var(--nh-text-xs);
      color: var(--nh-gold);
    }

    @media (hover: hover) and (pointer: fine) {
      :host(:hover) .cover,
      :host(:hover) .cover__image {
        transform: rotateY(-8deg) translateY(-0.4rem);
      }
    }
  `,
})
export class BookCover {
  readonly book = input.required<Book>();
  readonly tone = input<BookCoverTone>('navy');
}
