import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { INTEGRATIONS_CONFIG, type FormEndpoints } from '../config/integrations.config';
import type {
  ContactSubmission,
  NewsletterSubmission,
  SubmissionResult,
} from '../models/form.model';

export const FORM_ENDPOINTS = new InjectionToken<FormEndpoints>('FORM_ENDPOINTS', {
  providedIn: 'root',
  factory: () => INTEGRATIONS_CONFIG.forms,
});

const REQUEST_TIMEOUT_MS = 15_000;
const GENERIC_FAILURE_MESSAGE =
  'Não foi possível concluir o envio agora. Tente novamente em alguns instantes.';

/** Accepts absolute HTTPS URLs or same-origin paths; anything else is a configuration error. */
export function isAllowedEndpoint(endpoint: string): boolean {
  if (endpoint.startsWith('/') && !endpoint.startsWith('//')) {
    return true;
  }
  try {
    return new URL(endpoint).protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sends form payloads to the configured backend. While an endpoint is `null` the result is
 * `not-configured`, so the UI can be honest instead of pretending the message was delivered.
 */
@Injectable({ providedIn: 'root' })
export class FormSubmissionService {
  private readonly http = inject(HttpClient);
  private readonly endpoints = inject(FORM_ENDPOINTS);

  submitNewsletter(payload: NewsletterSubmission): Promise<SubmissionResult> {
    return this.submit('newsletter', this.endpoints.newsletter, payload);
  }

  submitContact(payload: ContactSubmission): Promise<SubmissionResult> {
    return this.submit('contact', this.endpoints.contact, payload);
  }

  private async submit(
    form: keyof FormEndpoints,
    endpoint: string | null,
    payload: NewsletterSubmission | ContactSubmission,
  ): Promise<SubmissionResult> {
    if (!endpoint) {
      return { status: 'not-configured' };
    }
    if (!isAllowedEndpoint(endpoint)) {
      console.error(`[forms] The ${form} endpoint must be HTTPS or same-origin.`);
      return { status: 'error', message: GENERIC_FAILURE_MESSAGE };
    }

    try {
      await firstValueFrom(this.http.post(endpoint, payload).pipe(timeout(REQUEST_TIMEOUT_MS)));
      return { status: 'success' };
    } catch (error: unknown) {
      // The payload carries personal data, so only transport details are logged.
      const detail = error instanceof HttpErrorResponse ? `HTTP ${error.status}` : String(error);
      console.error(`[forms] The ${form} submission failed: ${detail}.`);
      return { status: 'error', message: GENERIC_FAILURE_MESSAGE };
    }
  }
}
