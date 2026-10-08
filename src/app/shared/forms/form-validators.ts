import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Rejects values made only of whitespace, which `Validators.required` accepts. */
export const notBlankValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim().length === 0 && control.value !== ''
    ? { blank: true }
    : null;

/**
 * Optional Brazilian phone: empty is valid; otherwise 10 or 11 digits (area code + number),
 * optionally prefixed by the country code 55. Formatting characters are ignored.
 */
export const brazilianPhoneValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  const digits = (control.value ?? '').replace(/\D/g, '');
  if (!digits) {
    return null;
  }
  const national = digits.length > 11 && digits.startsWith('55') ? digits.slice(2) : digits;
  return /^[1-9]{2}\d{8,9}$/.test(national) ? null : { phone: true };
};

/** Returns the trimmed value, or `null` when an optional field was left empty. */
export function toOptionalValue(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
