import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { FOUNDATION_CONTENT } from '../../../data/institutional.data';
import { Icon } from '../../../shared/components/icon/icon';
import { ParallaxDirective } from '../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TrackDirective } from '../../../shared/directives/track.directive';

@Component({
  selector: 'nh-foundation-section',
  imports: [RouterLink, Icon, ParallaxDirective, RevealDirective, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './foundation-section.html',
  styleUrl: './foundation-section.scss',
})
export class FoundationSection {
  readonly showPageLink = input(true);

  protected readonly content = FOUNDATION_CONTENT;
  protected readonly internationalUrl = SITE_CONFIG.internationalFoundationUrl;
}
