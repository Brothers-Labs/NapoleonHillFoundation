import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { AnalyticsEventName, AnalyticsParams } from '../../../core/analytics/analytics-events';
import type { ContentAction } from '../../../core/models/content.model';
import { TrackDirective } from '../../directives/track.directive';
import { Icon } from '../icon/icon';

export type ActionAppearance = 'primary' | 'secondary' | 'link';

/**
 * Renders a configured `ContentAction` as an internal router link or an external link that
 * opens safely in a new tab. Keeps link semantics consistent across every content dataset.
 */
@Component({
  selector: 'nh-action-link',
  imports: [RouterLink, Icon, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let current = action();
    @switch (current.kind) {
      @case ('route') {
        <a
          [class]="classes()"
          [routerLink]="current.route"
          [fragment]="current.fragment"
          [nhTrack]="trackEvent()"
          [nhTrackParams]="trackParams()"
        >
          {{ current.label }}
          <nh-icon name="arrow-right" />
        </a>
      }
      @case ('external') {
        <a
          [class]="classes()"
          [href]="current.href"
          target="_blank"
          rel="noopener noreferrer"
          [nhTrack]="trackEvent()"
          [nhTrackParams]="trackParams()"
        >
          {{ current.label }}
          <span class="nh-visually-hidden">(abre em uma nova aba)</span>
          <nh-icon name="arrow-up-right" />
        </a>
      }
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class ActionLink {
  readonly action = input.required<ContentAction>();
  readonly appearance = input<ActionAppearance>('secondary');
  readonly trackEvent = input<AnalyticsEventName | null>(null);
  readonly trackParams = input<AnalyticsParams>({});

  protected readonly classes = computed(() => {
    switch (this.appearance()) {
      case 'primary':
        return 'nh-button nh-button--primary';
      case 'secondary':
        return 'nh-button';
      case 'link':
        return 'nh-link';
    }
  });
}
