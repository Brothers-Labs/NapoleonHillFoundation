import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConsentService } from '../../core/analytics/consent.service';
import { CONTACT_CONFIG } from '../../core/config/contact.config';
import { toWhatsAppUrl } from '../../core/utils/whatsapp';
import { Icon } from '../../shared/components/icon/icon';
import { TrackDirective } from '../../shared/directives/track.directive';

/**
 * Floating WhatsApp shortcut. Rendered only when an official number is configured, and kept out
 * of the way while the cookie banner occupies the bottom of the screen.
 */
@Component({
  selector: 'nh-whatsapp-button',
  imports: [Icon, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (url) {
      <a
        class="whatsapp"
        [class.is-hidden]="consent.isBannerVisible()"
        [href]="url"
        target="_blank"
        rel="noopener noreferrer"
        nhTrack="whatsapp_click"
        [nhTrackParams]="{ placement: 'floating' }"
      >
        <nh-icon name="whatsapp" />
        <span class="nh-visually-hidden">Fale conosco pelo WhatsApp (abre em uma nova aba)</span>
      </a>
    }
  `,
  styles: `
    .whatsapp {
      position: fixed;
      right: max(var(--nh-space-4), env(safe-area-inset-right, 0px));
      bottom: calc(var(--nh-space-4) + var(--nh-tab-bar-height) + var(--nh-safe-bottom));
      z-index: var(--nh-z-floating);
      display: grid;
      place-items: center;
      width: 3.25rem;
      height: 3.25rem;
      border: 1px solid var(--nh-gold-muted);
      border-radius: 50%;
      background: rgb(7 20 38 / 92%);
      color: var(--nh-gold);
      box-shadow: var(--nh-shadow-soft);
      backdrop-filter: blur(10px);
      transition:
        transform var(--nh-duration-base) var(--nh-ease-out),
        opacity var(--nh-duration-base),
        border-color var(--nh-duration-base);

      nh-icon {
        width: 1.375rem;
        height: 1.375rem;
      }

      &:hover {
        border-color: var(--nh-gold);
        transform: translateY(-2px);
      }

      &.is-hidden {
        opacity: 0;
        pointer-events: none;
        transform: translateY(1rem);
      }
    }
  `,
})
export class WhatsAppButton {
  protected readonly consent = inject(ConsentService);
  protected readonly url = toWhatsAppUrl(CONTACT_CONFIG.whatsapp);
}
