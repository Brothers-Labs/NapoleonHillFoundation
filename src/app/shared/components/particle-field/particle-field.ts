import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MotionService } from '../../../core/animations/motion.service';
import { injectBrowserWindow } from '../../../core/utils/browser';
import type { ParticleFieldRenderer, ParticleFieldVariant } from './particle-field.renderer';

const COMPACT_QUERY = '(max-width: 767.98px), (pointer: coarse)';
const FINE_POINTER_QUERY = '(pointer: fine)';
const IDLE_TIMEOUT_MS = 1200;

interface NetworkInformationLike {
  readonly saveData?: boolean;
}

/**
 * Decorative WebGL particle backdrop. Three.js is fetched lazily after the page is idle, so it
 * never competes with the hero's first paint. The scene pauses when off-screen or when the tab
 * is hidden, renders one still frame for reduced-motion users, and is skipped entirely when the
 * visitor asked to save data or WebGL is unavailable.
 */
@Component({
  selector: 'nh-particle-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.is-ready]': 'isReady()' },
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      pointer-events: none;
      opacity: 0;
      transition: opacity 2.4s var(--nh-ease-out);
    }

    :host(.is-ready) {
      opacity: 1;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `,
})
export class ParticleField {
  readonly variant = input<ParticleFieldVariant>('dust');

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly window = injectBrowserWindow();
  private readonly motion = inject(MotionService);
  protected readonly isReady = signal(false);

  private renderer: ParticleFieldRenderer | null = null;
  private readonly cleanups: (() => void)[] = [];
  private isDestroyed = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.teardown());
    afterNextRender(() => this.scheduleInitialization());
  }

  private scheduleInitialization(): void {
    const window = this.window;
    if (!window || this.shouldSaveData(window)) {
      return;
    }
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => void this.initialize(window), {
        timeout: IDLE_TIMEOUT_MS,
      });
      this.cleanups.push(() => window.cancelIdleCallback(handle));
    } else {
      const handle = setTimeout(() => void this.initialize(window), 200);
      this.cleanups.push(() => clearTimeout(handle));
    }
  }

  private async initialize(window: Window): Promise<void> {
    try {
      const { ParticleFieldRenderer } = await import('./particle-field.renderer');
      if (this.isDestroyed) {
        return;
      }
      this.renderer = new ParticleFieldRenderer(this.canvas().nativeElement, {
        variant: this.variant(),
        isCompact: window.matchMedia(COMPACT_QUERY).matches,
      });
    } catch (error) {
      console.warn('[particle-field] WebGL unavailable; keeping the static backdrop.', error);
      return;
    }

    const renderer = this.renderer;
    renderer.resize(this.host.clientWidth, this.host.clientHeight);

    if (this.motion.prefersReducedMotion()) {
      renderer.renderStaticFrame();
    } else {
      this.bindLifecycle(window, renderer);
    }
    this.isReady.set(true);
  }

  private bindLifecycle(window: Window, renderer: ParticleFieldRenderer): void {
    let isVisible = false;
    const sync = () =>
      isVisible && window.document.visibilityState === 'visible'
        ? renderer.start()
        : renderer.stop();

    const resizeObserver = new ResizeObserver(([entry]) => {
      renderer.resize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(this.host);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      sync();
    });
    visibilityObserver.observe(this.host);

    window.document.addEventListener('visibilitychange', sync);
    this.cleanups.push(
      () => resizeObserver.disconnect(),
      () => visibilityObserver.disconnect(),
      () => window.document.removeEventListener('visibilitychange', sync),
    );

    if (window.matchMedia(FINE_POINTER_QUERY).matches) {
      const onPointerMove = (event: PointerEvent) =>
        renderer.setPointer(
          (event.clientX / window.innerWidth) * 2 - 1,
          -((event.clientY / window.innerHeight) * 2 - 1),
        );
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      this.cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));
    }
  }

  private shouldSaveData(window: Window): boolean {
    const connection = (window.navigator as Navigator & { connection?: NetworkInformationLike })
      .connection;
    return connection?.saveData === true;
  }

  private teardown(): void {
    this.isDestroyed = true;
    for (const cleanup of this.cleanups.splice(0)) {
      cleanup();
    }
    this.renderer?.dispose();
    this.renderer = null;
  }
}
