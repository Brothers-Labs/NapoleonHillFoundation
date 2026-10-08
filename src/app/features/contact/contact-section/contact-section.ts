import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/analytics/analytics.service';
import { CONSENT_VERSION } from '../../../core/analytics/consent.service';
import { CONTACT_CONFIG } from '../../../core/config/contact.config';
import { SOCIAL_PROFILES } from '../../../core/config/social.config';
import type { SubmissionState } from '../../../core/models/form.model';
import { FormSubmissionService } from '../../../core/services/form-submission.service';
import { toWhatsAppUrl } from '../../../core/utils/whatsapp';
import { CONTACT_COPY } from '../../../data/home.data';
import { Icon } from '../../../shared/components/icon/icon';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TrackDirective } from '../../../shared/directives/track.directive';
import { FieldError } from '../../../shared/forms/field-error';
import { focusFirstInvalidControl } from '../../../shared/forms/form-focus';
import { FormStatus } from '../../../shared/forms/form-status';
import {
  brazilianPhoneValidator,
  notBlankValidator,
  toOptionalValue,
} from '../../../shared/forms/form-validators';

/** Only these Google Maps embed formats are trusted as iframe sources. */
export function isTrustedMapEmbed(url: string): boolean {
  return (
    url.startsWith('https://www.google.com/maps/embed?') ||
    (url.startsWith('https://www.google.com/maps?') && url.includes('output=embed'))
  );
}

@Component({
  selector: 'nh-contact-section',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Icon,
    SectionHeading,
    TrackDirective,
    FieldError,
    FormStatus,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly submissions = inject(FormSubmissionService);
  private readonly analytics = inject(AnalyticsService);
  private readonly consentVersion = inject(CONSENT_VERSION);

  protected readonly copy = CONTACT_COPY;
  protected readonly contact = CONTACT_CONFIG;
  protected readonly socialProfiles = SOCIAL_PROFILES;
  protected readonly whatsappUrl = toWhatsAppUrl(CONTACT_CONFIG.whatsapp);
  protected readonly hasChannels =
    this.whatsappUrl !== null ||
    CONTACT_CONFIG.email !== null ||
    CONTACT_CONFIG.phones.length > 0 ||
    CONTACT_CONFIG.address !== null ||
    SOCIAL_PROFILES.length > 0;
  // A map is shown only for a confirmed address and a trusted Google Maps embed.
  protected readonly mapUrl: SafeResourceUrl | null =
    CONTACT_CONFIG.address &&
    CONTACT_CONFIG.mapEmbedUrl &&
    isTrustedMapEmbed(CONTACT_CONFIG.mapEmbedUrl)
      ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(CONTACT_CONFIG.mapEmbedUrl)
      : null;

  protected readonly state = signal<SubmissionState>('idle');
  protected readonly errorMessage = signal('');

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, notBlankValidator, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    whatsapp: ['', [brazilianPhoneValidator]],
    subject: ['', [Validators.required, notBlankValidator, Validators.maxLength(160)]],
    message: [
      '',
      [
        Validators.required,
        notBlankValidator,
        Validators.minLength(10),
        Validators.maxLength(4000),
      ],
    ],
    consent: [false, [Validators.requiredTrue]],
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
      this.analytics.track('contact_start');
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

    const { name, email, whatsapp, subject, message, website } = this.form.getRawValue();
    if (website) {
      this.form.reset();
      return;
    }

    this.state.set('submitting');
    const result = await this.submissions.submitContact({
      name: name.trim(),
      email: email.trim(),
      whatsapp: toOptionalValue(whatsapp),
      subject: subject.trim(),
      message: message.trim(),
      consentVersion: this.consentVersion,
      consentedAt: new Date().toISOString(),
    });

    this.state.set(result.status);
    if (result.status === 'error') {
      this.errorMessage.set(result.message);
    }
    if (result.status === 'success') {
      this.analytics.track('contact_submit');
      this.form.reset();
    }
  }
}
