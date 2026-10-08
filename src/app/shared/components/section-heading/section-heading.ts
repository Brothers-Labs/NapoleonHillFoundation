import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { SectionCopy } from '../../../core/models/content.model';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'nh-section-heading',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-centered]': 'align() === "center"' },
  template: `
    <p class="nh-eyebrow" nhReveal="fade">{{ copy().eyebrow }}</p>
    @if (level() === 1) {
      <h1 class="nh-heading-1" [id]="titleId()" nhReveal [nhRevealDelay]="80">
        {{ copy().title }}
      </h1>
    } @else {
      <h2 class="nh-heading-2" [id]="titleId()" nhReveal [nhRevealDelay]="80">
        {{ copy().title }}
      </h2>
    }
    @if (copy().lead; as lead) {
      <p class="nh-lead" nhReveal [nhRevealDelay]="160">{{ lead }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--nh-space-5);
      max-width: 52rem;
    }

    :host(.is-centered) {
      justify-items: center;
      margin-inline: auto;
      text-align: center;
    }
  `,
})
export class SectionHeading {
  readonly copy = input.required<SectionCopy>();
  readonly titleId = input.required<string>();
  readonly level = input<1 | 2>(2);
  readonly align = input<'start' | 'center'>('start');
}
