import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FOUNDATION_CONTENT } from '../../../data/institutional.data';
import { Icon } from '../../../shared/components/icon/icon';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

/** Foundation page: mission statement with archive imagery, followed by the four pillars. */
@Component({
  selector: 'nh-foundation-mission',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mission nh-section nh-theme-light" aria-labelledby="mission-title">
      <div class="mission__grid nh-container">
        <div class="mission__text">
          <h2 class="mission__title" id="mission-title" nhReveal>{{ mission.title }}</h2>
          <span class="nh-rule" aria-hidden="true"></span>
          <p nhReveal [nhRevealDelay]="100">{{ mission.text }}</p>
        </div>
        <img
          class="mission__image"
          nhReveal="mask"
          [src]="mission.image.src"
          [alt]="mission.image.alt"
          [width]="mission.image.width"
          [height]="mission.image.height"
          loading="lazy"
          decoding="async"
        />
      </div>

      <ul class="mission__pillars nh-container">
        @for (pillar of pillars; track pillar.id; let index = $index) {
          <li class="pillar" nhReveal [nhRevealDelay]="index * 80">
            <nh-icon class="pillar__icon" [name]="pillar.icon" />
            <h3 class="pillar__title">{{ pillar.title }}</h3>
            <p class="pillar__description">{{ pillar.description }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .mission__grid {
      display: grid;
      gap: var(--nh-space-7);
      align-items: center;

      @media (min-width: 1024px) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--nh-space-9);
      }
    }

    .mission__text {
      display: grid;
      gap: var(--nh-space-4);
      color: var(--nh-text-muted);
    }

    .mission__title {
      font-size: var(--nh-heading-2);
      color: var(--nh-text);
    }

    .mission__image {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      border-radius: var(--nh-radius-lg);
      box-shadow: var(--nh-shadow-paper);
    }

    .mission__pillars {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-top: var(--nh-space-9);
      margin-bottom: 0;
      list-style: none;
      border-top: var(--nh-border-hairline);

      @media (min-width: 768px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    .pillar {
      display: grid;
      justify-items: center;
      align-content: start;
      gap: var(--nh-space-2);
      padding: var(--nh-space-6) var(--nh-space-3);
      text-align: center;
    }

    .pillar__icon {
      width: 2.25rem;
      height: 2.25rem;
      color: var(--nh-accent);
    }

    .pillar__title {
      font-size: var(--nh-text-xl);
    }

    .pillar__description {
      font-size: var(--nh-text-sm);
      color: var(--nh-text-muted);
    }
  `,
})
export class FoundationMission {
  protected readonly mission = FOUNDATION_CONTENT.mission;
  protected readonly pillars = FOUNDATION_CONTENT.pillars;
}
