import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/animations/motion.service';

/**
 * Subtle scroll-linked vertical drift. `nhParallax` is the travel distance as a percentage of
 * the element height. Desktop only: on touch devices it would compete with native scrolling.
 */
@Directive({ selector: '[nhParallax]' })
export class ParallaxDirective {
  readonly distance = input(12, { alias: 'nhParallax' });

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.animate(element, destroyRef, ({ gsap }) => {
        const media = gsap.matchMedia();
        media.add('(min-width: 1024px) and (pointer: fine)', () => {
          gsap.fromTo(
            element,
            { yPercent: -this.distance() / 2 },
            {
              yPercent: this.distance() / 2,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
        return () => media.revert();
      });
    });
  }
}
