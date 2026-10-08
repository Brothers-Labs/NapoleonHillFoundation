import { TestBed } from '@angular/core/testing';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, ConsentService } from './consent.service';

describe('ConsentService', () => {
  const setup = (version = 'v1') => {
    TestBed.configureTestingModule({
      providers: [{ provide: CONSENT_VERSION, useValue: version }],
    });
    return TestBed.inject(ConsentService);
  };

  beforeEach(() => localStorage.clear());

  it('starts undecided and shows the banner', () => {
    const service = setup();
    expect(service.preferences()).toBeNull();
    expect(service.isBannerVisible()).toBe(true);
  });

  it('persists the decision with its policy version', () => {
    const service = setup();
    service.acceptAll();

    expect(service.preferences()).toEqual({ analytics: true, marketing: true });
    expect(service.isBannerVisible()).toBe(false);
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? '{}');
    expect(stored).toMatchObject({ analytics: true, marketing: true, version: 'v1' });
  });

  it('restores a stored decision for the same policy version', () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: true, marketing: false, version: 'v1', decidedAt: 'x' }),
    );
    expect(setup().preferences()).toEqual({ analytics: true, marketing: false });
  });

  it('asks again when the policy version changed', () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: true, marketing: true, version: 'v1', decidedAt: 'x' }),
    );
    expect(setup('v2').preferences()).toBeNull();
  });

  it('ignores corrupted storage', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, '{not json');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(setup().preferences()).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('can reopen the banner after a decision', () => {
    const service = setup();
    service.rejectOptional();
    service.reopen();

    expect(service.isBannerVisible()).toBe(true);
    expect(service.preferences()).toEqual({ analytics: false, marketing: false });
  });
});
