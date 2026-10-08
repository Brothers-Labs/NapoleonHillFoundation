import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROGRAMS, PROGRAMS_COPY } from '../../../data/programs.data';
import { Icon } from '../../../shared/components/icon/icon';
import { PendingNotice } from '../../../shared/components/pending-notice/pending-notice';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TrackDirective } from '../../../shared/directives/track.directive';

@Component({
  selector: 'nh-programs-section',
  imports: [RouterLink, Icon, PendingNotice, SectionHeading, RevealDirective, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './programs-section.html',
  styleUrl: './programs-section.scss',
})
export class ProgramsSection {
  readonly showPageLink = input(true);

  protected readonly copy = PROGRAMS_COPY;
  protected readonly programs = PROGRAMS;
}
