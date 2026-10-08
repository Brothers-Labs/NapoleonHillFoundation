import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/analytics/consent.service';

/**
 * LGPD consent banner. Rendered only after hydration, because the decision lives in the
 * visitor's browser and the prerendered HTML must be identical for everyone.
 */
@Component({
  selector: 'nh-cookie-consent',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
})
export class CookieConsent {
  private readonly consent = inject(ConsentService);
  private readonly isHydrated = signal(false);

  protected readonly isVisible = computed(
    () => this.isHydrated() && this.consent.isBannerVisible(),
  );
  protected readonly isCustomizing = signal(false);
  protected readonly allowsAnalytics = signal(false);
  protected readonly allowsMarketing = signal(false);

  constructor() {
    afterNextRender(() => this.isHydrated.set(true));
  }

  protected acceptAll(): void {
    this.consent.acceptAll();
    this.isCustomizing.set(false);
  }

  protected rejectOptional(): void {
    this.consent.rejectOptional();
    this.isCustomizing.set(false);
  }

  protected customize(): void {
    const current = this.consent.preferences();
    this.allowsAnalytics.set(current?.analytics ?? false);
    this.allowsMarketing.set(current?.marketing ?? false);
    this.isCustomizing.set(true);
  }

  protected saveSelection(): void {
    this.consent.save({
      analytics: this.allowsAnalytics(),
      marketing: this.allowsMarketing(),
    });
    this.isCustomizing.set(false);
  }

  protected onToggle(event: Event, target: 'analytics' | 'marketing'): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    (target === 'analytics' ? this.allowsAnalytics : this.allowsMarketing).set(isChecked);
  }
}
