import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/analytics/analytics.service';
import { CONSENT_VERSION } from '../../../core/analytics/consent.service';
import type { SubmissionState } from '../../../core/models/form.model';
import { FormSubmissionService } from '../../../core/services/form-submission.service';
import { NEWSLETTER_COPY } from '../../../data/home.data';
import { FieldError } from '../../../shared/forms/field-error';
import { focusFirstInvalidControl } from '../../../shared/forms/form-focus';
import { FormStatus } from '../../../shared/forms/form-status';
import {
  brazilianPhoneValidator,
  notBlankValidator,
  toOptionalValue,
} from '../../../shared/forms/form-validators';

@Component({
  selector: 'nh-newsletter-section',
  imports: [ReactiveFormsModule, RouterLink, FieldError, FormStatus],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './newsletter-section.html',
  styleUrl: './newsletter-section.scss',
})
export class NewsletterSection {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly submissions = inject(FormSubmissionService);
  private readonly analytics = inject(AnalyticsService);
  private readonly consentVersion = inject(CONSENT_VERSION);

  protected readonly copy = NEWSLETTER_COPY;
  protected readonly state = signal<SubmissionState>('idle');
  protected readonly errorMessage = signal('');

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, notBlankValidator, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    whatsapp: ['', [brazilianPhoneValidator]],
    consent: [false, [Validators.requiredTrue]],
    // Honeypot: hidden from people, filled by naive bots.
    website: [''],
  });

  private hasStarted = false;

  protected isInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  protected onFirstInteraction(): void {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.analytics.track('newsletter_start');
    }
  }

  protected async submit(): Promise<void> {
    if (this.state() === 'submitting') {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      focusFirstInvalidControl(this.host, this.form);
      return;
    }

    const { name, email, whatsapp, website } = this.form.getRawValue();
    if (website) {
      this.form.reset();
      return;
    }

    this.state.set('submitting');
    const result = await this.submissions.submitNewsletter({
      name: name.trim(),
      email: email.trim(),
      whatsapp: toOptionalValue(whatsapp),
      consentVersion: this.consentVersion,
      consentedAt: new Date().toISOString(),
    });

    this.state.set(result.status);
    if (result.status === 'error') {
      this.errorMessage.set(result.message);
    }
    if (result.status === 'success') {
      this.analytics.track('newsletter_submit');
      this.form.reset();
    }
  }
}
