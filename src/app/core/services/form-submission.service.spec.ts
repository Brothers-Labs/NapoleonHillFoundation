import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { FormEndpoints } from '../config/integrations.config';
import type { NewsletterSubmission } from '../models/form.model';
import {
  FORM_ENDPOINTS,
  FormSubmissionService,
  isAllowedEndpoint,
} from './form-submission.service';

const PAYLOAD: NewsletterSubmission = {
  name: 'Ana',
  email: 'ana@example.com',
  whatsapp: null,
  consentVersion: 'test',
  consentedAt: '2026-10-07T00:00:00.000Z',
};

describe('FormSubmissionService', () => {
  const setup = (endpoints: FormEndpoints) => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: FORM_ENDPOINTS, useValue: endpoints },
      ],
    });
    return {
      service: TestBed.inject(FormSubmissionService),
      http: TestBed.inject(HttpTestingController),
    };
  };

  it('reports not-configured instead of pretending to submit', async () => {
    const { service, http } = setup({ newsletter: null, contact: null });

    await expect(service.submitNewsletter(PAYLOAD)).resolves.toEqual({ status: 'not-configured' });
    http.verify();
  });

  it('posts the payload to the configured endpoint', async () => {
    const { service, http } = setup({ newsletter: 'https://api.example.com/leads', contact: null });

    const result = service.submitNewsletter(PAYLOAD);
    const request = http.expectOne('https://api.example.com/leads');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(PAYLOAD);
    request.flush({});

    await expect(result).resolves.toEqual({ status: 'success' });
  });

  it('turns HTTP failures into a friendly error without logging personal data', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { service, http } = setup({ newsletter: '/api/leads', contact: null });

    const result = service.submitNewsletter(PAYLOAD);
    http.expectOne('/api/leads').flush('boom', { status: 500, statusText: 'Server Error' });

    const resolved = await result;
    expect(resolved.status).toBe('error');
    expect(JSON.stringify(error.mock.calls)).not.toContain(PAYLOAD.email);
  });

  it('refuses insecure endpoints', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { service, http } = setup({ newsletter: 'http://insecure.example.com', contact: null });

    await expect(service.submitNewsletter(PAYLOAD)).resolves.toMatchObject({ status: 'error' });
    http.verify();
  });
});

describe('isAllowedEndpoint', () => {
  it.each([
    ['https://api.example.com/x', true],
    ['/api/contact', true],
    ['//evil.example.com', false],
    ['http://api.example.com', false],
    ['javascript:alert(1)', false],
  ])('%s → %s', (endpoint, expected) => {
    expect(isAllowedEndpoint(endpoint)).toBe(expected);
  });
});
