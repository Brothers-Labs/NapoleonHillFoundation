import { FormControl } from '@angular/forms';
import { brazilianPhoneValidator, notBlankValidator, toOptionalValue } from './form-validators';

describe('brazilianPhoneValidator', () => {
  const validate = (value: string) => brazilianPhoneValidator(new FormControl(value));

  it.each(['', '(11) 91234-5678', '11912345678', '1132345678', '+55 11 91234-5678'])(
    'accepts "%s"',
    (value) => {
      expect(validate(value)).toBeNull();
    },
  );

  it.each(['123', '01912345678', '(11) 1234', '5511912345678999'])('rejects "%s"', (value) => {
    expect(validate(value)).toEqual({ phone: true });
  });
});

describe('notBlankValidator', () => {
  it('rejects whitespace-only values', () => {
    expect(notBlankValidator(new FormControl('   '))).toEqual({ blank: true });
  });

  it('leaves empty values to Validators.required', () => {
    expect(notBlankValidator(new FormControl(''))).toBeNull();
  });

  it('accepts real text', () => {
    expect(notBlankValidator(new FormControl(' Ana '))).toBeNull();
  });
});

describe('toOptionalValue', () => {
  it('trims values and converts empty ones to null', () => {
    expect(toOptionalValue('  11 91234-5678 ')).toBe('11 91234-5678');
    expect(toOptionalValue('   ')).toBeNull();
  });
});
