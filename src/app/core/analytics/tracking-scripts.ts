/**
 * Vendor bootstrap snippets, rewritten as typed functions. Each loader validates its ID before
 * building a script URL, so a malformed config value can never inject arbitrary markup.
 */

type CommandQueue = (...args: unknown[]) => void;

interface MetaPixel extends CommandQueue {
  callMethod?: CommandQueue;
  queue: unknown[][];
  push: MetaPixel;
  loaded: boolean;
  version: string;
}

interface ClarityQueue extends CommandQueue {
  q?: unknown[];
}

export interface TrackingWindow extends Window {
  dataLayer?: unknown[];
  gtag?: CommandQueue;
  fbq?: MetaPixel;
  _fbq?: MetaPixel;
  clarity?: ClarityQueue;
}

const ID_PATTERNS = {
  gtm: /^GTM-[A-Z0-9]{4,12}$/,
  ga4: /^G-[A-Z0-9]{4,16}$/,
  metaPixel: /^\d{6,20}$/,
  clarity: /^[a-z0-9]{6,20}$/,
} as const;

export type TrackerKind = keyof typeof ID_PATTERNS;

export function isValidTrackerId(kind: TrackerKind, id: string): boolean {
  return ID_PATTERNS[kind].test(id);
}

function appendScript(document: Document, src: string): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function loadGoogleTagManager(document: Document, window: TrackingWindow, id: string): void {
  window.dataLayer ??= [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  appendScript(document, `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`);
}

export function loadGoogleAnalytics(document: Document, window: TrackingWindow, id: string): void {
  const dataLayer = (window.dataLayer ??= []);
  window.gtag = function gtag() {
    // gtag.js expects the native `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
  appendScript(document, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

export function loadMicrosoftClarity(document: Document, window: TrackingWindow, id: string): void {
  const queue: ClarityQueue = (...args: unknown[]) => {
    (queue.q ??= []).push(args);
  };
  window.clarity ??= queue;
  appendScript(document, `https://www.clarity.ms/tag/${encodeURIComponent(id)}`);
}

export function loadMetaPixel(document: Document, window: TrackingWindow, id: string): void {
  if (!window.fbq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.callMethod) {
        pixel.callMethod(...args);
      } else {
        pixel.queue.push(args);
      }
    }) as MetaPixel;
    pixel.queue = [];
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = '2.0';
    window.fbq = pixel;
    window._fbq = pixel;
    appendScript(document, 'https://connect.facebook.net/en_US/fbevents.js');
  }
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}
