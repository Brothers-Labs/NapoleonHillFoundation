export interface NewsletterSubmission {
  readonly name: string;
  readonly email: string;
  readonly whatsapp: string | null;
  readonly consentVersion: string;
  readonly consentedAt: string;
}

export interface ContactSubmission {
  readonly name: string;
  readonly email: string;
  readonly whatsapp: string | null;
  readonly subject: string;
  readonly message: string;
  readonly consentVersion: string;
  readonly consentedAt: string;
}

export type SubmissionResult =
  | { readonly status: 'success' }
  | { readonly status: 'not-configured' }
  | { readonly status: 'error'; readonly message: string };

export type SubmissionState = 'idle' | 'submitting' | SubmissionResult['status'];
