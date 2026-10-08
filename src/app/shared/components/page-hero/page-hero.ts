import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ImageAsset, SectionCopy } from '../../../core/models/content.model';
import { RevealDirective } from '../../directives/reveal.directive';

/** Opening block of every internal page: breadcrumb, eyebrow, H1 and lead. */
@Component({
  selector: 'nh-page-hero',
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-hero nh-grain" [class.has-image]="image()">
      <div class="page-hero__glow" aria-hidden="true"></div>
      @if (image(); as asset) {
        <img
          class="page-hero__image"
          [src]="asset.src"
          [alt]="asset.alt"
          [width]="asset.width"
          [height]="asset.height"
          fetchpriority="high"
          decoding="async"
        />
      }
      <div class="nh-container page-hero__content">
        <nav class="page-hero__breadcrumb" aria-label="Você está em">
          <ol>
            <li><a routerLink="/">Início</a></li>
            <li aria-current="page">{{ breadcrumb() }}</li>
          </ol>
        </nav>
        <p class="nh-eyebrow" nhReveal="fade">{{ copy().eyebrow }}</p>
        <h1 class="nh-heading-1 page-hero__title" nhReveal [nhRevealDelay]="80">
          {{ copy().title }}
        </h1>
        @if (copy().lead; as lead) {
          <p class="nh-lead" nhReveal [nhRevealDelay]="160">{{ lead }}</p>
        }
      </div>
    </header>
  `,
  styles: `
    .page-hero {
      position: relative;
      overflow: hidden;
      padding-block: calc(var(--nh-header-height) + var(--nh-space-9)) var(--nh-space-9);
      background: var(--nh-black);
    }

    .page-hero__glow {
      position: absolute;
      inset: -40% -10% auto auto;
      width: 70vmax;
      height: 70vmax;
      background: radial-gradient(closest-side, rgb(198 161 91 / 14%), transparent);
    }

    // Mobile: image fills the top area behind the copy. Desktop: right half, fading left.
    .page-hero__image {
      position: absolute;
      inset: 0 0 auto;
      width: 100%;
      height: 70%;
      object-fit: cover;
      object-position: center 25%;
      opacity: 0.5;
      -webkit-mask-image: linear-gradient(180deg, #000 40%, transparent);
      mask-image: linear-gradient(180deg, #000 40%, transparent);

      @media (min-width: 1024px) {
        inset: 0 0 0 auto;
        width: 50%;
        height: 100%;
        opacity: 0.9;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 45%);
        mask-image: linear-gradient(90deg, transparent, #000 45%);
      }
    }

    .page-hero.has-image {
      padding-top: calc(var(--nh-header-height) + 12rem);

      @media (min-width: 1024px) {
        padding-top: calc(var(--nh-header-height) + var(--nh-space-9));
      }
    }

    .page-hero__content {
      position: relative;
      z-index: var(--nh-z-base);
      display: grid;
      gap: var(--nh-space-5);
    }

    .page-hero__title {
      max-width: 18ch;
    }

    .page-hero__breadcrumb ol {
      display: flex;
      flex-wrap: wrap;
      gap: var(--nh-space-2);
      margin: 0 0 var(--nh-space-4);
      padding: 0;
      list-style: none;
      font-size: var(--nh-text-xs);
      color: var(--nh-text-subtle);
    }

    .page-hero__breadcrumb li + li::before {
      content: '/';
      margin-right: var(--nh-space-2);
    }

    .page-hero__breadcrumb li {
      display: inline-flex;
      align-items: center;
      min-height: var(--nh-touch-target);
    }

    .page-hero__breadcrumb a {
      display: inline-flex;
      align-items: center;
      min-height: var(--nh-touch-target);
      text-decoration: none;

      &:hover {
        color: var(--nh-gold);
      }
    }
  `,
})
export class PageHero {
  readonly copy = input.required<SectionCopy>();
  readonly breadcrumb = input.required<string>();
  readonly image = input<ImageAsset | null>(null);
}
