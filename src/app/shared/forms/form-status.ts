import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { SubmissionState } from '../../core/models/form.model';

/** Announces the outcome of a form submission to sighted and screen-reader users alike. */
@Component({
  selector: 'nh-form-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'status', 'aria-live': 'polite' },
  template: `
    @if (message(); as text) {
      <p class="nh-form-status" [class.nh-form-status--error]="isError()">{{ text }}</p>
    }
  `,
})
export class FormStatus {
  readonly state = input.required<SubmissionState>();
  readonly successMessage = input.required<string>();
  readonly notConfiguredMessage = input.required<string>();
  readonly errorMessage = input('');

  protected readonly isError = computed(() => this.state() === 'error');
  protected readonly message = computed(() => {
    switch (this.state()) {
      case 'success':
        return this.successMessage();
      case 'not-configured':
        return this.notConfiguredMessage();
      case 'error':
        return this.errorMessage();
      case 'idle':
      case 'submitting':
        return '';
    }
  });
}
