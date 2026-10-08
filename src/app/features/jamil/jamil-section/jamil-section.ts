import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JAMIL_PROFILE } from '../../../data/jamil.data';
import { MediaFrame } from '../../../shared/components/media-frame/media-frame';
import { PendingNotice } from '../../../shared/components/pending-notice/pending-notice';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TrackDirective } from '../../../shared/directives/track.directive';

/** Summary on home; the detailed variant adds the biography, key numbers and a quote. */
@Component({
  selector: 'nh-jamil-section',
  imports: [RouterLink, MediaFrame, PendingNotice, RevealDirective, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jamil-section.html',
  styleUrl: './jamil-section.scss',
})
export class JamilSection {
  readonly isDetailed = input(false);

  protected readonly profile = JAMIL_PROFILE;
  protected readonly paragraphs = computed(() =>
    this.isDetailed() ? [...this.profile.summary, ...this.profile.biography] : this.profile.summary,
  );
}
