import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { ActiveSectionService } from '../../core/services/active-section.service';

/**
 * Gives a home section its anchor id and reports it to the header's active-state tracking.
 * Usage: `<nh-philosophy-section nhSection="filosofia" />`.
 */
@Directive({
  selector: '[nhSection]',
  host: { '[id]': 'sectionId()' },
})
export class SectionAnchorDirective {
  readonly sectionId = input.required<string>({ alias: 'nhSection' });

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const activeSection = inject(ActiveSectionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => destroyRef.onDestroy(activeSection.register(element)));
  }
}
