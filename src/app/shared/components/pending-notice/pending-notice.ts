import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

/**
 * Editorial placeholder for sections whose official content has not been published yet.
 * It states plainly that the content is coming, instead of filling the space with invented data.
 */
@Component({
  selector: 'nh-pending-notice',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="notice__ornament" aria-hidden="true"></span>
    <p class="notice__title">{{ title() }}</p>
    <p class="notice__text">{{ description() }}</p>
    @if (showContactLink()) {
      <a class="nh-link" routerLink="/contato">
        Fale com nossa equipe
        <nh-icon name="arrow-right" />
      </a>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: grid;
      justify-items: start;
      gap: var(--nh-space-3);
      max-width: 40rem;
      padding: var(--nh-space-6) var(--nh-space-6) var(--nh-space-5);
      border: var(--nh-border-hairline);
      border-left: 1px solid var(--nh-accent);
    }

    .notice__ornament {
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid var(--nh-accent);
      transform: rotate(45deg);
    }

    .notice__title {
      font-family: var(--nh-font-serif);
      font-size: var(--nh-text-xl);
      line-height: 1.3;
    }

    .notice__text {
      color: var(--nh-text-muted);
    }
  `,
})
export class PendingNotice {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly showContactLink = input(true);
}
