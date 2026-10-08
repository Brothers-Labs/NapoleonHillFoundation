import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionService } from '../../../core/animations/motion.service';
import { PRIMARY_CALL_TO_ACTION } from '../../../core/config/navigation.config';
import { CLOSING_CONTENT } from '../../../data/home.data';
import { Icon } from '../../../shared/components/icon/icon';
import { ParticleField } from '../../../shared/components/particle-field/particle-field';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'nh-closing-section',
  imports: [RouterLink, Icon, ParticleField, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="closing nh-grain" aria-labelledby="closing-title">
      <nh-particle-field variant="embers" />
      <div class="closing__halo" aria-hidden="true"></div>
      <div class="closing__content nh-container">
        <h2 class="closing__title" id="closing-title">{{ content.title }}</h2>
        <p class="closing__lead" nhReveal [nhRevealDelay]="120">{{ content.lead }}</p>
        <div class="nh-actions closing__actions" nhReveal [nhRevealDelay]="220">
          <a class="nh-button nh-button--primary" [routerLink]="callToAction.route">
            {{ callToAction.label }}
            <nh-icon name="arrow-right" />
          </a>
          <a class="nh-button" routerLink="/contato">Fale com nossa equipe</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .closing {
      position: relative;
      display: grid;
      place-items: center;
      min-height: min(100svh, 56rem);
      padding-block: var(--nh-section-space);
      overflow: hidden;
      background:
        radial-gradient(60% 50% at 50% 100%, rgb(168 124 50 / 18%), transparent 70%),
        var(--nh-black);
      text-align: center;
    }

    .closing__halo {
      position: absolute;
      top: 50%;
      left: 50%;
      width: min(80vmin, 44rem);
      aspect-ratio: 1;
      border: 1px solid rgb(198 161 91 / 14%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow:
        0 0 0 3.5rem rgb(198 161 91 / 2.5%),
        0 0 0 7rem rgb(198 161 91 / 1.5%);
      pointer-events: none;
    }

    .closing__content {
      position: relative;
      z-index: var(--nh-z-base);
      display: grid;
      justify-items: center;
      gap: var(--nh-space-6);
    }

    .closing__title {
      font-size: clamp(3rem, 1.6rem + 6vw, 7.5rem);
      font-weight: 300;
      font-style: italic;
      line-height: 0.95;
      letter-spacing: -0.02em;
      will-change: transform, opacity;
    }

    .closing__lead {
      max-width: 32rem;
      font-size: var(--nh-text-lg);
      color: var(--nh-text-muted);
    }

    .closing__actions {
      justify-content: center;
      width: 100%;
    }
  `,
})
export class ClosingSection {
  protected readonly content = CLOSING_CONTENT;
  protected readonly callToAction = PRIMARY_CALL_TO_ACTION;

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.animate(host, destroyRef, ({ gsap }) => {
        gsap.fromTo(
          '.closing__title',
          { scale: 0.86, opacity: 0.2 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: host, start: 'top 85%', end: 'center 55%', scrub: true },
          },
        );
      });
    });
  }
}
