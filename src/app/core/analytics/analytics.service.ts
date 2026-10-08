import { DOCUMENT, Injectable, InjectionToken, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { INTEGRATIONS_CONFIG, type AnalyticsIntegrations } from '../config/integrations.config';
import { injectBrowserWindow } from '../utils/browser';
import { ConsentService, type ConsentPreferences } from './consent.service';
import {
  SCROLL_DEPTH_THRESHOLDS,
  type AnalyticsEventName,
  type AnalyticsParams,
} from './analytics-events';
import {
  isValidTrackerId,
  loadGoogleAnalytics,
  loadGoogleTagManager,
  loadMetaPixel,
  loadMicrosoftClarity,
  type TrackerKind,
  type TrackingWindow,
} from './tracking-scripts';

export const ANALYTICS_INTEGRATIONS = new InjectionToken<AnalyticsIntegrations>(
  'ANALYTICS_INTEGRATIONS',
  { providedIn: 'root', factory: () => INTEGRATIONS_CONFIG.analytics },
);

/**
 * Vendor-agnostic analytics facade. Components only call `track()`; which vendors receive the
 * event depends on configuration and on the visitor's consent. Before consent, nothing is
 * loaded and events are dropped rather than queued.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly window = injectBrowserWindow() as TrackingWindow | null;
  private readonly consent = inject(ConsentService);
  private readonly router = inject(Router);
  private readonly integrations = inject(ANALYTICS_INTEGRATIONS);

  private hasLoadedAnalytics = false;
  private hasLoadedMarketing = false;
  private reachedDepths = new Set<number>();
  private pendingScrollFrame: number | null = null;

  constructor() {
    if (!this.window) {
      return;
    }
    effect(() => this.loadConsentedVendors(this.consent.preferences()));
  }

  track(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
    const preferences = this.consent.preferences();
    if (!this.window || !preferences) {
      return;
    }

    if (preferences.analytics) {
      this.window.dataLayer?.push({ event: name, ...params });
      if (this.integrations.ga4MeasurementId && !this.integrations.gtmContainerId) {
        this.window.gtag?.('event', name, params);
      }
    }
    if (preferences.marketing) {
      this.window.fbq?.('trackCustom', name, params);
    }
  }

  /** Starts scroll-depth and SPA page-view tracking. Call once, from the root component. */
  startAutomaticTracking(): void {
    const window = this.window;
    if (!window) {
      return;
    }

    window.addEventListener('scroll', () => this.scheduleScrollDepthCheck(window), {
      passive: true,
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.reachedDepths = new Set<number>();
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  private trackPageView(path: string): void {
    const preferences = this.consent.preferences();
    if (!this.window || !preferences) {
      return;
    }
    // GA4 enhanced measurement already records history changes; GTM listens to this event.
    if (preferences.analytics) {
      this.window.dataLayer?.push({ event: 'nh_page_view', page_path: path });
    }
    if (preferences.marketing) {
      this.window.fbq?.('track', 'PageView');
    }
  }

  private scheduleScrollDepthCheck(window: Window): void {
    if (this.pendingScrollFrame !== null) {
      return;
    }
    this.pendingScrollFrame = window.requestAnimationFrame(() => {
      this.pendingScrollFrame = null;
      const scrollable = this.document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }
      const depth = (window.scrollY / scrollable) * 100;
      for (const [threshold, eventName] of SCROLL_DEPTH_THRESHOLDS) {
        if (depth >= threshold && !this.reachedDepths.has(threshold)) {
          this.reachedDepths.add(threshold);
          this.track(eventName);
        }
      }
    });
  }

  private loadConsentedVendors(preferences: ConsentPreferences | null): void {
    const window = this.window;
    if (!window || !preferences) {
      return;
    }
    const { gtmContainerId, ga4MeasurementId, clarityProjectId, metaPixelId } = this.integrations;

    if (preferences.analytics && !this.hasLoadedAnalytics) {
      this.hasLoadedAnalytics = true;
      this.loadIfValid('gtm', gtmContainerId, (id) =>
        loadGoogleTagManager(this.document, window, id),
      );
      if (!gtmContainerId) {
        this.loadIfValid('ga4', ga4MeasurementId, (id) =>
          loadGoogleAnalytics(this.document, window, id),
        );
      }
      this.loadIfValid('clarity', clarityProjectId, (id) =>
        loadMicrosoftClarity(this.document, window, id),
      );
    }

    if (preferences.marketing && !this.hasLoadedMarketing) {
      this.hasLoadedMarketing = true;
      this.loadIfValid('metaPixel', metaPixelId, (id) => loadMetaPixel(this.document, window, id));
    }
  }

  private loadIfValid(kind: TrackerKind, id: string | null, load: (id: string) => void): void {
    if (!id) {
      return;
    }
    if (!isValidTrackerId(kind, id)) {
      console.error(`[analytics] Ignoring malformed ${kind} id. Check integrations.config.ts.`);
      return;
    }
    load(id);
  }
}
