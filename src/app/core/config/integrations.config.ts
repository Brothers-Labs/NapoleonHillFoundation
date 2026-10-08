export interface AnalyticsIntegrations {
  /** Google Analytics 4 measurement ID (`G-XXXXXXX`). Leave `null` when GA4 runs through GTM. */
  readonly ga4MeasurementId: string | null;
  /** Google Tag Manager container ID (`GTM-XXXXXXX`). */
  readonly gtmContainerId: string | null;
  /** Meta Pixel ID (digits only). Loaded only after marketing consent. */
  readonly metaPixelId: string | null;
  /** Microsoft Clarity project ID. Loaded only after analytics consent. */
  readonly clarityProjectId: string | null;
}

export interface FormEndpoints {
  /** HTTPS endpoint that accepts a JSON `NewsletterSubmission`. */
  readonly newsletter: string | null;
  /** HTTPS endpoint that accepts a JSON `ContactSubmission`. */
  readonly contact: string | null;
}

export interface IntegrationsConfig {
  readonly analytics: AnalyticsIntegrations;
  readonly forms: FormEndpoints;
  /** Bump whenever the privacy policy changes, so stored consent is requested again. */
  readonly consentVersion: string;
}

/*
 * IDs are intentionally `null`: no tracker is loaded and no form pretends to submit until a real
 * value is configured. Values are public identifiers, never secrets.
 */
export const INTEGRATIONS_CONFIG: IntegrationsConfig = {
  analytics: {
    ga4MeasurementId: null,
    gtmContainerId: null,
    metaPixelId: null,
    clarityProjectId: null,
  },
  forms: {
    // TODO: configurar o endpoint da newsletter (CRM ou API própria).
    newsletter: null,
    // TODO: configurar o endpoint do formulário de contato.
    contact: null,
  },
  consentVersion: '2026-10',
};
