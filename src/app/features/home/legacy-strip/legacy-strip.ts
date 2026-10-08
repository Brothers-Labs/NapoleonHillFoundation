import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LEGACY_HIGHLIGHTS } from '../../../data/napoleon-hill.data';
import { Icon } from '../../../shared/components/icon/icon';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'nh-legacy-strip',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="strip" aria-label="O legado em marcos">
      <dl class="strip__list nh-container nh-container--wide">
        @for (highlight of highlights; track highlight.id; let index = $index) {
          <div class="strip__item" nhReveal [nhRevealDelay]="index * 80">
            <nh-icon class="strip__icon" [name]="highlight.icon" />
            <div class="strip__text">
              <dt class="strip__label">{{ highlight.label }}</dt>
              <dd class="strip__value">{{ highlight.value }}</dd>
            </div>
          </div>
        }
      </dl>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .strip {
      background: var(--nh-midnight);
      border-block: 1px solid var(--nh-line);
    }

    // Mobile: compact icon-on-top columns that swipe horizontally.
    .strip__list {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(6rem, 1fr);
      margin-block: 0;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;

      @media (min-width: 1024px) {
        grid-auto-columns: 1fr;
        overflow: visible;
      }
    }

    .strip__item {
      display: grid;
      justify-items: center;
      align-content: start;
      gap: var(--nh-space-2);
      padding: var(--nh-space-5) var(--nh-space-2);
      text-align: center;
      scroll-snap-align: start;

      @media (min-width: 1024px) {
        grid-template-columns: auto minmax(0, 1fr);
        justify-items: start;
        align-items: start;
        gap: var(--nh-space-4);
        padding: var(--nh-space-6) var(--nh-space-5);
        text-align: left;

        & + & {
          border-left: var(--nh-border-hairline);
        }
      }
    }

    .strip__icon {
      width: 1.75rem;
      height: 1.75rem;
      color: var(--nh-gold);

      @media (min-width: 1024px) {
        width: 2.25rem;
        height: 2.25rem;
      }
    }

    // Visual order: value first, label below; DOM keeps label (dt) before value (dd).
    .strip__text {
      display: flex;
      flex-direction: column-reverse;
      gap: var(--nh-space-1);
    }

    .strip__value {
      margin: 0;
      font-family: var(--nh-font-serif);
      font-size: clamp(1.125rem, 0.9rem + 1vw, 1.75rem);
      line-height: 1;
      text-transform: uppercase;
      color: var(--nh-gold);
      font-variant-numeric: lining-nums;
      white-space: nowrap;
    }

    .strip__label {
      font-size: var(--nh-text-2xs);
      font-weight: 500;
      letter-spacing: 0.08em;
      line-height: 1.45;
      text-transform: uppercase;
      color: var(--nh-text-muted);
    }
  `,
})
export class LegacyStrip {
  protected readonly highlights = LEGACY_HIGHLIGHTS;
}
