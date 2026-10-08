import { Injectable } from '@angular/core';
import { injectBrowserWindow } from '../utils/browser';

/**
 * SSR-safe wrapper around `localStorage`. Storage can be missing (server), blocked (privacy
 * settings) or full, so every access is guarded and failures are reported instead of thrown.
 */
@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  private readonly storage = this.resolveStorage();

  read(key: string): string | null {
    if (!this.storage) {
      return null;
    }
    try {
      return this.storage.getItem(key);
    } catch (error) {
      console.warn(`[storage] Could not read "${key}".`, error);
      return null;
    }
  }

  write(key: string, value: string): boolean {
    if (!this.storage) {
      return false;
    }
    try {
      this.storage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`[storage] Could not write "${key}".`, error);
      return false;
    }
  }

  private resolveStorage(): Storage | null {
    try {
      return injectBrowserWindow()?.localStorage ?? null;
    } catch (error) {
      console.warn('[storage] localStorage is unavailable.', error);
      return null;
    }
  }
}
