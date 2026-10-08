import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics/analytics.service';
import { SeoService } from './core/seo/seo.service';
import { CookieConsent } from './layout/cookie-consent/cookie-consent';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { MobileTabBar } from './layout/mobile-tab-bar/mobile-tab-bar';
import { ScrollProgress } from './layout/scroll-progress/scroll-progress';
import { WhatsAppButton } from './layout/whatsapp-button/whatsapp-button';

@Component({
  selector: 'nh-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    MobileTabBar,
    CookieConsent,
    WhatsAppButton,
    ScrollProgress,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="nh-skip-link" href="#conteudo" (click)="skipToContent($event, main)">
      Pular para o conteúdo
    </a>
    <nh-scroll-progress />
    <nh-header />
    <main #main id="conteudo" tabindex="-1">
      <router-outlet />
    </main>
    <nh-footer />
    <nh-mobile-tab-bar />
    <nh-whatsapp-button />
    <nh-cookie-consent />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {
  constructor() {
    // Eagerly instantiated so metadata is applied on the very first navigation, including prerender.
    inject(SeoService);
    const analytics = inject(AnalyticsService);
    afterNextRender(() => analytics.startAutomaticTracking());
  }

  /** `<base href="/">` would resolve "#conteudo" to the home page, so focus is moved directly. */
  protected skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }
}
