import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';

/**
 * Official logo when configured; otherwise the institutional name set as a typographic lockup,
 * following the visual mock. The text fallback is not a redesign of the official logo.
 */
@Component({
  selector: 'nh-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (logo; as asset) {
      <img [src]="asset.src" [alt]="asset.alt" [width]="asset.width" [height]="asset.height" />
    } @else {
      <span class="brand__name">The Napoleon Hill</span>
      <span class="brand__rule" aria-hidden="true"></span>
      <span class="brand__overline">Foundation Brasil</span>
    }
  `,
  styles: `
    :host {
      display: inline-grid;
      justify-items: center;
      gap: 0.2rem;
      line-height: 1;
    }

    img {
      height: 2.5rem;
      width: auto;
    }

    .brand__name {
      font-family: var(--nh-font-serif);
      font-size: 1.375rem;
      font-weight: 500;
      font-variant: small-caps;
      letter-spacing: 0.02em;
      color: var(--nh-ivory);
    }

    .brand__rule {
      width: 100%;
      height: 1px;
      background: var(--nh-gold);
      opacity: 0.7;
    }

    .brand__overline {
      font-family: var(--nh-font-serif);
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--nh-gold);
    }
  `,
})
export class BrandMark {
  protected readonly logo = SITE_CONFIG.logo;
}
