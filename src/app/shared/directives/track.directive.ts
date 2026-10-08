import { Directive, inject, input } from '@angular/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import type { AnalyticsEventName, AnalyticsParams } from '../../core/analytics/analytics-events';

/** Declarative click tracking: `<a nhTrack="program_click" [nhTrackParams]="{ id }">`. */
@Directive({
  selector: '[nhTrack]',
  host: { '(click)': 'onClick()' },
})
export class TrackDirective {
  private readonly analytics = inject(AnalyticsService);

  /** `null` disables tracking, which lets reusable components make it optional. */
  readonly eventName = input.required<AnalyticsEventName | null>({ alias: 'nhTrack' });
  readonly params = input<AnalyticsParams>({}, { alias: 'nhTrackParams' });

  protected onClick(): void {
    const eventName = this.eventName();
    if (eventName) {
      this.analytics.track(eventName, this.params());
    }
  }
}
