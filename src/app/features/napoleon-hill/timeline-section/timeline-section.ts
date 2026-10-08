import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { MotionService } from '../../../core/animations/motion.service';
import { TIMELINE_COPY, TIMELINE_EVENTS, TIMELINE_IMAGE } from '../../../data/napoleon-hill.data';
import { ParallaxDirective } from '../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

/**
 * Four-milestone timeline. The rail fills as the section crosses the viewport; without motion
 * the rail is simply drawn complete.
 */
@Component({
  selector: 'nh-timeline-section',
  imports: [ParallaxDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-section.html',
  styleUrl: './timeline-section.scss',
})
export class TimelineSection {
  protected readonly copy = TIMELINE_COPY;
  protected readonly events = TIMELINE_EVENTS;
  protected readonly image = TIMELINE_IMAGE;

  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const progress = this.progress().nativeElement;
      motion.animate(host, destroyRef, ({ gsap }) => {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: host, start: 'top 75%', end: 'center 45%', scrub: true },
          },
        );
      });
    });
  }
}
