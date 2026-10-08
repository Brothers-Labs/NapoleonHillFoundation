import { DOCUMENT, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Returns the browser `window`, or `null` during server rendering and prerendering.
 * Must be called in an injection context.
 */
export function injectBrowserWindow(): Window | null {
  return isPlatformBrowser(inject(PLATFORM_ID)) ? inject(DOCUMENT).defaultView : null;
}
