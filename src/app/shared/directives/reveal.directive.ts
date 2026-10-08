import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/animations/motion.service';

export type RevealVariant = 'up' | 'fade' | 'mask';

/**
 * Reveals the host when it scrolls into view. The hidden state lives in CSS under
 * `html.nh-motion`, so prerendered HTML stays readable without JavaScript.
 *
 * Usage: `<p nhReveal>`, `<figure nhReveal="mask" [nhRevealDelay]="120">`.
 */
@Directive({
  selector: '[nhReveal]',
  host: {
    '[attr.data-reveal]': 'variant() || "up"',
    '[style.--nh-reveal-delay]': 'delay() + "ms"',
  },
})
export class RevealDirective {
  readonly variant = input<RevealVariant | ''>('', { alias: 'nhReveal' });
  readonly delay = input(0, { alias: 'nhRevealDelay' });

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stopObserving = motion.observeReveal(element);
      destroyRef.onDestroy(stopObserving);
    });
  }
}
