import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParallaxDirective } from '../../directives/parallax.directive';

/**
 * Decorative arrangement of manuscript sheets that stands in for archive photography until
 * authorized images exist. Purely ornamental, hidden from assistive technology.
 */
@Component({
  selector: 'nh-archive-composition',
  imports: [ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="sheet sheet--back" [nhParallax]="18"></div>
    <div class="sheet sheet--middle" [nhParallax]="10">
      <span class="sheet__lines"></span>
    </div>
    <div class="sheet sheet--front" [nhParallax]="4">
      <span class="sheet__heading"></span>
      <span class="sheet__lines"></span>
    </div>
    <span class="seal" [nhParallax]="24"></span>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      aspect-ratio: 4 / 5;
      max-width: 34rem;
      width: 100%;
    }

    .sheet {
      position: absolute;
      border: 1px solid rgb(22 22 22 / 10%);
      background:
        radial-gradient(120% 90% at 20% 10%, rgb(255 255 255 / 55%), transparent 60%),
        linear-gradient(180deg, #f3ecdc, #e5dbc4);
      box-shadow: var(--nh-shadow-deep);
    }

    .sheet--back {
      inset: 4% 22% 18% 2%;
      transform: rotate(-7deg);
      opacity: 0.55;
    }

    .sheet--middle {
      inset: 10% 8% 10% 14%;
      transform: rotate(3deg);
      opacity: 0.8;
    }

    .sheet--front {
      inset: 18% 16% 2% 22%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 12% 10%;
      transform: rotate(-1.5deg);
    }

    .sheet--front .sheet__lines {
      flex: 1;
      height: auto;
    }

    .sheet__heading {
      flex: none;
      width: 55%;
      height: 0.6rem;
      background: rgb(22 22 22 / 35%);
    }

    // Ruled handwriting suggestion drawn with a gradient instead of an image.
    .sheet__lines {
      display: block;
      width: 100%;
      height: 60%;
      background: repeating-linear-gradient(
        180deg,
        transparent 0 1.05rem,
        rgb(22 22 22 / 14%) 1.05rem calc(1.05rem + 1px)
      );
    }

    .sheet--middle .sheet__lines {
      margin: 18% 12%;
      width: 76%;
    }

    .seal {
      position: absolute;
      right: 6%;
      bottom: 12%;
      width: 18%;
      aspect-ratio: 1;
      border: 1px solid var(--nh-gold);
      border-radius: 50%;
      background: radial-gradient(circle, rgb(198 161 91 / 28%), rgb(168 124 50 / 8%) 70%);
      box-shadow: 0 0 0 6px rgb(198 161 91 / 10%);
    }
  `,
})
export class ArchiveComposition {}
