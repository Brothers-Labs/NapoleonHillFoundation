import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOUNDATION_CONTENT } from '../../../data/institutional.data';
import { NAPOLEON_HILL_PROFILE } from '../../../data/napoleon-hill.data';
import { MediaFrame } from '../../../shared/components/media-frame/media-frame';
import { ParallaxDirective } from '../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

/** "Quem foi Napoleon Hill?": a short summary on home, the full biography on its own page. */
@Component({
  selector: 'nh-hill-intro-section',
  imports: [RouterLink, MediaFrame, ParallaxDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="intro nh-section nh-theme-light" aria-labelledby="hill-intro-title">
      <img
        class="intro__backdrop"
        [src]="backdrop.src"
        alt=""
        aria-hidden="true"
        [width]="backdrop.width"
        [height]="backdrop.height"
        loading="lazy"
        decoding="async"
      />
      <div class="intro__grid nh-container">
        <div class="intro__media" nhReveal="mask">
          <nh-media-frame
            [image]="profile.portrait"
            aspect="portrait"
            monogram="N.H."
            placeholderCaption="Napoleon Hill · retrato histórico"
            [nhParallax]="4"
          />
        </div>

        <div class="intro__content">
          <p class="intro__eyebrow" nhReveal="fade">{{ profile.intro.eyebrow }}</p>
          <h2 class="intro__title" id="hill-intro-title" nhReveal [nhRevealDelay]="80">
            {{ profile.intro.title }}
          </h2>
          <span class="nh-rule" aria-hidden="true"></span>
          <div class="intro__prose">
            @for (paragraph of paragraphs(); track $index) {
              <p nhReveal [nhRevealDelay]="140">{{ paragraph }}</p>
            }
          </div>
          @if (!isDetailed()) {
            <a
              class="nh-button nh-button--outline"
              routerLink="/napoleon-hill"
              nhReveal
              [nhRevealDelay]="200"
            >
              Conheça sua história
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .intro {
      overflow: hidden;
    }

    // Faded institutional architecture bleeding off the right edge (desktop only).
    .intro__backdrop {
      display: none;

      @media (min-width: 1024px) {
        position: absolute;
        inset: 0 0 0 auto;
        display: block;
        width: 34%;
        height: 100%;
        object-fit: cover;
        opacity: 0.22;
        filter: grayscale(0.6) sepia(0.3);
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 60%);
        mask-image: linear-gradient(90deg, transparent, #000 60%);
      }
    }

    .intro__grid {
      position: relative;
      z-index: var(--nh-z-base);
      display: grid;
      gap: var(--nh-space-7);
      align-items: center;

      @media (min-width: 1024px) {
        grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
        gap: clamp(3rem, 1rem + 5vw, 7rem);
      }
    }

    .intro__media {
      max-width: 28rem;
      overflow: hidden;
      border-radius: var(--nh-radius-lg);
      box-shadow: var(--nh-shadow-paper);
    }

    .intro__content {
      display: grid;
      justify-items: start;
      gap: var(--nh-space-5);
    }

    .intro__eyebrow {
      font-size: var(--nh-text-xs);
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--nh-accent);
    }

    .intro__title {
      font-size: var(--nh-heading-2);
      line-height: 1.05;
    }

    .intro__prose {
      display: grid;
      gap: var(--nh-space-4);
      max-width: 36rem;
      color: var(--nh-text-muted);
    }
  `,
})
export class HillIntroSection {
  readonly isDetailed = input(false);

  protected readonly profile = NAPOLEON_HILL_PROFILE;
  protected readonly backdrop = FOUNDATION_CONTENT.image;
  protected readonly paragraphs = computed(() =>
    this.isDetailed() ? [...this.profile.summary, ...this.profile.biography] : this.profile.summary,
  );
}
