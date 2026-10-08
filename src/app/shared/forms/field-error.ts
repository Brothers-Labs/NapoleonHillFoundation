import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ValidationErrors } from '@angular/forms';

const MESSAGES: Readonly<Record<string, string>> = {
  required: 'Este campo é obrigatório.',
  blank: 'Este campo é obrigatório.',
  email: 'Informe um e-mail válido.',
  phone: 'Informe um telefone com DDD, por exemplo (11) 91234-5678.',
  minlength: 'O texto informado é muito curto.',
  maxlength: 'O texto informado é muito longo.',
};

/** Shows the first validation message of a control once the visitor has interacted with it. */
@Component({
  selector: 'nh-field-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nh-field__error', '[attr.id]': 'errorId()', 'aria-live': 'polite' },
  template: `{{ message() }}`,
})
export class FieldError {
  readonly errors = input.required<ValidationErrors | null>();
  readonly isVisible = input.required<boolean>();
  readonly errorId = input.required<string>();

  protected readonly message = computed(() => {
    const errors = this.errors();
    if (!this.isVisible() || !errors) {
      return '';
    }
    const firstKey = Object.keys(errors)[0];
    return firstKey ? (MESSAGES[firstKey] ?? 'Verifique este campo.') : '';
  });
}
