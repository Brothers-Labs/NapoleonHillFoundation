import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAZIL_CONTENT } from '../../../data/institutional.data';
import { ParallaxDirective } from '../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'nh-brazil-section',
  imports: [RouterLink, ParallaxDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brazil-section.html',
  styleUrl: './brazil-section.scss',
})
export class BrazilSection {
  readonly showPageLink = input(true);

  protected readonly content = BRAZIL_CONTENT;
}
