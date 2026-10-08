import type { FormGroup } from '@angular/forms';

/** Moves focus to the first invalid control, in declaration order, so errors are not missed. */
export function focusFirstInvalidControl(host: HTMLElement, form: FormGroup): void {
  const firstInvalid = Object.entries(form.controls).find(([, control]) => control.invalid);
  if (!firstInvalid) {
    return;
  }
  host.querySelector<HTMLElement>(`[formControlName="${firstInvalid[0]}"]`)?.focus();
}
