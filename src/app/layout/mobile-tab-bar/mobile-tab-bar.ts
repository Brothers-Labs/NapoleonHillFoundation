import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MOBILE_TAB_BAR } from '../../core/config/navigation.config';
import { Icon } from '../../shared/components/icon/icon';

/** Fixed bottom navigation for phones, following the mobile mock. Hidden from tablet up. */
@Component({
  selector: 'nh-mobile-tab-bar',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="tab-bar" aria-label="Atalhos">
      <ul class="tab-bar__list">
        @for (item of items; track item.link.id) {
          <li>
            <a
              class="tab-bar__link"
              [routerLink]="item.link.route"
              routerLinkActive="is-active"
              ariaCurrentWhenActive="page"
              [routerLinkActiveOptions]="{ exact: item.link.route === '/' }"
            >
              <nh-icon [name]="item.icon" />
              <span>{{ item.link.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;

      @media (min-width: 768px) {
        display: none;
      }
    }

    .tab-bar {
      position: fixed;
      inset: auto 0 0;
      z-index: var(--nh-z-floating);
      padding-bottom: var(--nh-safe-bottom);
      background: rgb(5 8 12 / 94%);
      border-top: 1px solid var(--nh-line);
      backdrop-filter: blur(14px);
    }

    .tab-bar__list {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tab-bar__link {
      display: grid;
      justify-items: center;
      gap: 0.2rem;
      min-height: 3.75rem;
      padding: var(--nh-space-2) 0;
      color: var(--nh-text-muted);
      font-size: 0.6875rem;
      text-decoration: none;
      transition: color var(--nh-duration-base);

      nh-icon {
        width: 1.375rem;
        height: 1.375rem;
      }

      &.is-active {
        color: var(--nh-gold);
      }
    }
  `,
})
export class MobileTabBar {
  protected readonly items = MOBILE_TAB_BAR;
}
