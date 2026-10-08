import { Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { INTEGRATIONS_CONFIG } from '../config/integrations.config';
import { BrowserStorageService } from '../services/browser-storage.service';

export interface ConsentPreferences {
  readonly analytics: boolean;
  readonly marketing: boolean;
}

interface StoredConsent extends ConsentPreferences {
  readonly version: string;
  readonly decidedAt: string;
}

export const CONSENT_STORAGE_KEY = 'nh.consent';

export const CONSENT_VERSION = new InjectionToken<string>('CONSENT_VERSION', {
  providedIn: 'root',
  factory: () => INTEGRATIONS_CONFIG.consentVersion,
});

function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate['analytics'] === 'boolean' &&
    typeof candidate['marketing'] === 'boolean' &&
    typeof candidate['version'] === 'string' &&
    typeof candidate['decidedAt'] === 'string'
  );
}

/**
 * LGPD consent state. `null` means the visitor has not decided yet, which is treated as
 * "no optional tracking". A stored decision for an older policy version is discarded.
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly storage = inject(BrowserStorageService);
  private readonly version = inject(CONSENT_VERSION);

  private readonly state = signal<ConsentPreferences | null>(this.restore());
  private readonly isReopened = signal(false);

  readonly preferences = this.state.asReadonly();
  readonly hasDecided = computed(() => this.state() !== null);
  readonly isBannerVisible = computed(() => !this.hasDecided() || this.isReopened());

  acceptAll(): void {
    this.save({ analytics: true, marketing: true });
  }

  rejectOptional(): void {
    this.save({ analytics: false, marketing: false });
  }

  save(preferences: ConsentPreferences): void {
    const stored: StoredConsent = {
      ...preferences,
      version: this.version,
      decidedAt: new Date().toISOString(),
    };
    this.storage.write(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    this.state.set({ analytics: preferences.analytics, marketing: preferences.marketing });
    this.isReopened.set(false);
  }

  reopen(): void {
    this.isReopened.set(true);
  }

  private restore(): ConsentPreferences | null {
    const raw = this.storage.read(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isStoredConsent(parsed) || parsed.version !== this.version) {
        return null;
      }
      return { analytics: parsed.analytics, marketing: parsed.marketing };
    } catch (error) {
      console.warn('[consent] Stored consent is corrupted and was ignored.', error);
      return null;
    }
  }
}
