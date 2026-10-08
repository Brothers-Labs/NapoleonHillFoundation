import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AnalyticsService } from '../../../core/analytics/analytics.service';
import type { GalleryItem } from '../../../core/models/media.model';
import { GALLERY_CATEGORIES, GALLERY_COPY, GALLERY_ITEMS } from '../../../data/media.data';
import { Dialog } from '../../../shared/components/dialog/dialog';
import { Icon } from '../../../shared/components/icon/icon';
import { PendingNotice } from '../../../shared/components/pending-notice/pending-notice';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

const ALL_CATEGORIES = 'all';
const SWIPE_THRESHOLD_PX = 48;

@Component({
  selector: 'nh-gallery-section',
  imports: [Dialog, Icon, PendingNotice, SectionHeading, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-section.html',
  styleUrl: './gallery-section.scss',
})
export class GallerySection {
  private readonly analytics = inject(AnalyticsService);

  protected readonly copy = GALLERY_COPY;
  protected readonly allCategories = ALL_CATEGORIES;
  /** Only categories that actually contain photos become filters. */
  protected readonly categories = GALLERY_CATEGORIES.filter((category) =>
    GALLERY_ITEMS.some((item) => item.category === category.id),
  );
  protected readonly hasItems = GALLERY_ITEMS.length > 0;
  protected readonly activeCategory = signal<string>(ALL_CATEGORIES);

  protected readonly visibleItems = computed<readonly GalleryItem[]>(() => {
    const category = this.activeCategory();
    return category === ALL_CATEGORIES
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === category);
  });

  private readonly openIndex = signal<number | null>(null);
  protected readonly isLightboxOpen = computed(() => this.openIndex() !== null);
  protected readonly current = computed(() => {
    const index = this.openIndex();
    return index === null ? null : (this.visibleItems()[index] ?? null);
  });
  protected readonly position = computed(() => (this.openIndex() ?? 0) + 1);

  private swipeStartX: number | null = null;

  protected open(index: number): void {
    this.openIndex.set(index);
    const item = this.visibleItems()[index];
    if (item) {
      this.analytics.track('gallery_open', { photo: item.id });
    }
  }

  protected step(direction: 1 | -1): void {
    const total = this.visibleItems().length;
    this.openIndex.update((index) => (index === null ? null : (index + direction + total) % total));
  }

  protected onLightboxChange(isOpen: boolean): void {
    if (!isOpen) {
      this.openIndex.set(null);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.step(1);
    } else if (event.key === 'ArrowLeft') {
      this.step(-1);
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.swipeStartX === null) {
      return;
    }
    const distance = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD_PX) {
      this.step(distance < 0 ? 1 : -1);
    }
  }
}
