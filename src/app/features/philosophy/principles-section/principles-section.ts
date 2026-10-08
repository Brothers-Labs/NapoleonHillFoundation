import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { SuccessPrinciple } from '../../../core/models/philosophy.model';
import {
  FEATURED_PRINCIPLE_ORDERS,
  PRINCIPLES_COPY,
  SUCCESS_PRINCIPLES,
} from '../../../data/success-principles.data';
import { Dialog } from '../../../shared/components/dialog/dialog';
import { Icon } from '../../../shared/components/icon/icon';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

export type PrinciplesVariant = 'featured' | 'complete';

function formatOrder(order: number): string {
  return String(order).padStart(2, '0');
}

/**
 * `featured` (home): five highlighted principles as icon cards. `complete` (philosophy page):
 * the full editorial index. Both open the same drawer, which can step through all principles.
 */
@Component({
  selector: 'nh-principles-section',
  imports: [RouterLink, Dialog, Icon, SectionHeading, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './principles-section.html',
  styleUrl: './principles-section.scss',
})
export class PrinciplesSection {
  readonly variant = input<PrinciplesVariant>('featured');

  protected readonly copy = PRINCIPLES_COPY;
  protected readonly principles = SUCCESS_PRINCIPLES;
  protected readonly featured = FEATURED_PRINCIPLE_ORDERS.map((order) =>
    SUCCESS_PRINCIPLES.findIndex((principle) => principle.order === order),
  ).filter((index) => index >= 0);
  protected readonly formatOrder = formatOrder;

  private readonly selectedIndex = signal<number | null>(null);
  protected readonly selected = computed<SuccessPrinciple | null>(() => {
    const index = this.selectedIndex();
    return index === null ? null : (this.principles[index] ?? null);
  });
  protected readonly isDrawerOpen = computed(() => this.selectedIndex() !== null);

  protected open(index: number): void {
    this.selectedIndex.set(index);
  }

  protected step(direction: 1 | -1): void {
    this.selectedIndex.update((index) =>
      index === null ? null : (index + direction + this.principles.length) % this.principles.length,
    );
  }

  protected onDrawerChange(isOpen: boolean): void {
    if (!isOpen) {
      this.selectedIndex.set(null);
    }
  }
}
