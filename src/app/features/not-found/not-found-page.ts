import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'nh-not-found-page',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="not-found nh-grain" aria-labelledby="not-found-title">
      <div class="nh-container not-found__content">
        <p class="not-found__code" aria-hidden="true">404</p>
        <h1 class="nh-heading-2" id="not-found-title">Esta página não está disponível.</h1>
        <p class="nh-lead">O endereço pode ter mudado. O legado, não.</p>
        <a class="nh-button nh-button--primary" routerLink="/">
          Voltar ao início
          <nh-icon name="arrow-right" />
        </a>
      </div>
    </section>
  `,
  styles: `
    .not-found {
      position: relative;
      display: grid;
      align-items: center;
      min-height: 100svh;
      padding-block: calc(var(--nh-header-height) + var(--nh-space-8)) var(--nh-space-9);
      background: var(--nh-black);
    }

    .not-found__content {
      position: relative;
      z-index: var(--nh-z-base);
      display: grid;
      justify-items: start;
      gap: var(--nh-space-5);
    }

    .not-found__code {
      font-family: var(--nh-font-serif);
      font-size: clamp(6rem, 4rem + 10vw, 12rem);
      font-weight: 300;
      font-style: italic;
      line-height: 0.9;
      color: var(--nh-gold);
    }
  `,
})
export class NotFoundPage {}
