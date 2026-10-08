import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionService } from '../../../core/animations/motion.service';
import type { VideoItem } from '../../../core/models/media.model';
import { HERO_CONTENT } from '../../../data/home.data';
import { FEATURED_VIDEO } from '../../../data/media.data';
import { Icon } from '../../../shared/components/icon/icon';
import { ParticleField } from '../../../shared/components/particle-field/particle-field';
import { VideoDialog } from '../../../shared/components/video-dialog/video-dialog';
import { TrackDirective } from '../../../shared/directives/track.directive';

/**
 * Opening scene. The entrance is pure CSS so the headline (the LCP element) paints without
 * waiting for JavaScript; GSAP only adds the scroll-out once the page is interactive.
 */
@Component({
  selector: 'nh-hero-section',
  imports: [RouterLink, Icon, ParticleField, VideoDialog, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  protected readonly content = HERO_CONTENT;
  protected readonly featuredVideo = FEATURED_VIDEO;
  protected readonly playingVideo = signal<VideoItem | null>(null);

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.animate(host, destroyRef, ({ gsap }) => {
        const scrollOut = {
          trigger: host,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        };
        gsap.to('.hero__content', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: scrollOut,
        });
        gsap.to('.hero__backdrop', { scale: 1.08, ease: 'none', scrollTrigger: scrollOut });
        gsap.to('.hero__scroll', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { ...scrollOut, end: '20% top' },
        });
      });
    });
  }

  protected playFeaturedVideo(): void {
    this.playingVideo.set(this.featuredVideo);
  }
}
