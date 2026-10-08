import { DestroyRef, Injectable, signal } from '@angular/core';
import { injectBrowserWindow } from '../utils/browser';

type GsapModule = typeof import('gsap');
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger');

export interface GsapToolkit {
  readonly gsap: GsapModule['gsap'];
  readonly ScrollTrigger: ScrollTriggerModule['ScrollTrigger'];
}

/** A setup may return a cleanup callback for resources GSAP does not track (classes, listeners). */
export type MotionSetup = (toolkit: GsapToolkit) => void | (() => void);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const REVEALED_CLASS = 'is-revealed';

@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly window = injectBrowserWindow();
  readonly isBrowser = this.window !== null;

  private readonly reducedMotion = signal(this.readReducedMotion());
  readonly prefersReducedMotion = this.reducedMotion.asReadonly();

  private toolkit: Promise<GsapToolkit> | null = null;
  private revealObserver: IntersectionObserver | null = null;

  constructor() {
    this.window
      ?.matchMedia?.(REDUCED_MOTION_QUERY)
      .addEventListener('change', (event) => this.reducedMotion.set(event.matches));
  }

  /**
   * Runs a GSAP setup scoped to `scope`. Every tween and ScrollTrigger created inside it is
   * reverted when `destroyRef` fires. Skipped on the server and for reduced-motion users, so
   * setups only add enhancement on top of a layout that already works without them.
   */
  animate(scope: Element, destroyRef: DestroyRef, setup: MotionSetup): void {
    if (!this.isBrowser || this.reducedMotion()) {
      return;
    }

    let isDestroyed = false;
    let revert: (() => void) | null = null;
    destroyRef.onDestroy(() => {
      isDestroyed = true;
      revert?.();
    });

    this.loadToolkit()
      .then((toolkit) => {
        if (isDestroyed) {
          return;
        }
        let cleanup: void | (() => void);
        const context = toolkit.gsap.context(() => {
          cleanup = setup(toolkit);
        }, scope);
        revert = () => {
          cleanup?.();
          context.revert();
        };
      })
      .catch((error: unknown) => console.error('[motion] Failed to load GSAP.', error));
  }

  /** Reveals `element` once it enters the viewport. Returns a function that stops observing. */
  observeReveal(element: Element): () => void {
    if (!this.isBrowser) {
      return () => undefined;
    }

    const observer = this.getRevealObserver();
    if (!observer) {
      element.classList.add(REVEALED_CLASS);
      return () => undefined;
    }

    observer.observe(element);
    return () => observer.unobserve(element);
  }

  private getRevealObserver(): IntersectionObserver | null {
    if (this.revealObserver || !this.window || !('IntersectionObserver' in this.window)) {
      // Without IntersectionObserver the caller reveals immediately.
      return this.revealObserver;
    }

    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(REVEALED_CLASS);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    return this.revealObserver;
  }

  private loadToolkit(): Promise<GsapToolkit> {
    this.toolkit ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      },
    );
    return this.toolkit;
  }

  private readReducedMotion(): boolean {
    return this.window?.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
  }
}
