import { Injectable, signal } from '@angular/core';
import { injectBrowserWindow } from '../utils/browser';

/**
 * Tracks which registered home section crosses the middle of the viewport, so the header can
 * highlight the matching navigation entry.
 */
@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private readonly window = injectBrowserWindow();
  private readonly activeId = signal<string | null>(null);
  readonly activeSectionId = this.activeId.asReadonly();

  private observer: IntersectionObserver | null = null;

  register(element: Element): () => void {
    const observer = this.getObserver();
    if (!observer) {
      return () => undefined;
    }

    observer.observe(element);
    return () => {
      observer.unobserve(element);
      if (this.activeId() === element.id) {
        this.activeId.set(null);
      }
    };
  }

  private getObserver(): IntersectionObserver | null {
    if (this.observer || !this.window || !('IntersectionObserver' in this.window)) {
      return this.observer;
    }

    // A thin band around the viewport center: exactly one section intersects it at a time.
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          this.activeId.set(visible.target.id);
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    return this.observer;
  }
}
