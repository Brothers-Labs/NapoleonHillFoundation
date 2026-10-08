import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Hairline reading-progress indicator driven by a native scroll-linked animation: no JavaScript,
 * no scroll listener. Browsers without `animation-timeline` simply do not show it.
 */
@Component({
  selector: 'nh-scroll-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: '',
  styles: `
    :host {
      display: none;
    }

    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host {
          position: fixed;
          inset: 0 0 auto;
          z-index: var(--nh-z-progress);
          display: block;
          height: 2px;
          background: linear-gradient(90deg, var(--nh-antique-gold), var(--nh-gold));
          transform-origin: left;
          opacity: 0.8;
          animation: progress linear both;
          animation-timeline: scroll(root block);
        }
      }
    }

    @keyframes progress {
      from {
        transform: scaleX(0);
      }

      to {
        transform: scaleX(1);
      }
    }
  `,
})
export class ScrollProgress {}
