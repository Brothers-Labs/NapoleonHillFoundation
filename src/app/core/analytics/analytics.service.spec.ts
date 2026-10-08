import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { AnalyticsIntegrations } from '../config/integrations.config';
import { ANALYTICS_INTEGRATIONS, AnalyticsService } from './analytics.service';
import { CONSENT_VERSION, ConsentService } from './consent.service';
import type { TrackingWindow } from './tracking-scripts';

const NO_INTEGRATIONS: AnalyticsIntegrations = {
  ga4MeasurementId: null,
  gtmContainerId: null,
  metaPixelId: null,
  clarityProjectId: null,
};

describe('AnalyticsService', () => {
  const trackingWindow = window as TrackingWindow;

  const setup = (integrations: AnalyticsIntegrations = NO_INTEGRATIONS) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ANALYTICS_INTEGRATIONS, useValue: integrations },
        { provide: CONSENT_VERSION, useValue: 'test' },
      ],
    });
    return { analytics: TestBed.inject(AnalyticsService), consent: TestBed.inject(ConsentService) };
  };

  beforeEach(() => {
    localStorage.clear();
    delete trackingWindow.dataLayer;
    document.head.querySelectorAll('script[src]').forEach((script) => script.remove());
  });

  it('drops events while the visitor has not consented', () => {
    const { analytics } = setup();
    trackingWindow.dataLayer = [];

    analytics.track('whatsapp_click');

    expect(trackingWindow.dataLayer).toEqual([]);
  });

  it('forwards events to the data layer after analytics consent', () => {
    const { analytics, consent } = setup();
    trackingWindow.dataLayer = [];
    consent.save({ analytics: true, marketing: false });

    analytics.track('program_click', { program: 'abc' });

    expect(trackingWindow.dataLayer).toContainEqual({ event: 'program_click', program: 'abc' });
  });

  it('loads Google Tag Manager only after consent', () => {
    const { consent } = setup({ ...NO_INTEGRATIONS, gtmContainerId: 'GTM-ABC1234' });
    TestBed.tick();
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();

    consent.save({ analytics: true, marketing: false });
    TestBed.tick();

    expect(document.querySelector('script[src*="gtm.js?id=GTM-ABC1234"]')).not.toBeNull();
  });

  it('refuses malformed tracker ids', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { consent } = setup({ ...NO_INTEGRATIONS, gtmContainerId: 'GTM-"><img>' });

    consent.save({ analytics: true, marketing: false });
    TestBed.tick();

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    expect(error).toHaveBeenCalled();
  });
});
