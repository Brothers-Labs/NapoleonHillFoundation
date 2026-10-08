import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Stroke icons drawn on a 24×24 grid, matching the thin editorial line weight of the UI. */
const ICON_PATHS = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-down': 'M12 5v14M6 13l6 6 6-6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'chevron-left': 'm15 6-6 6 6 6',
  'chevron-right': 'm9 6 6 6-6 6',
  'chevron-down': 'm6 9 6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  play: 'M8 5.5v13l10.5-6.5z',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7',
  phone:
    'M6.6 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 5.9 5.9l1.3-2 4.2 1.5v3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1z',
  'map-pin':
    'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  whatsapp:
    'M4 20l1.2-4.1A8.5 8.5 0 1 1 8.4 19zM9 8.5c.2 3 2.6 5.8 6 6.5l1.2-1.4-2-1-1 .9c-1-.5-1.9-1.4-2.4-2.4l.9-1-1-2z',
  instagram:
    'M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.2 6.8h.01',
  youtube:
    'M21 8.2a2.8 2.8 0 0 0-2-2C17.3 5.8 12 5.8 12 5.8s-5.3 0-7 .4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.6 12a29 29 0 0 0 .4 3.8 2.8 2.8 0 0 0 2 2c1.7.4 7 .4 7 .4s5.3 0 7-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-3.8 29 29 0 0 0-.4-3.8zM10 15V9l5 3z',
  linkedin:
    'M4.5 9.5h3v10h-3zM6 4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10.5 9.5h2.9v1.4c.6-1 1.8-1.7 3.3-1.7 3 0 3.8 1.9 3.8 4.5v5.8h-3v-5.2c0-1.3-.3-2.5-1.8-2.5s-2.2 1.1-2.2 2.5v5.2h-3z',
  facebook:
    'M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z',
  'chevron-up': 'm6 15 6-6 6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  home: 'M4 11 12 4.5 20 11M6 9.5v10h12v-10M10 19.5v-5h4v5',
  video: 'M3.5 6.5h12v11h-12zM15.5 10.5l5-3v9l-5-3z',
  calendar: 'M4 6.5h16v13H4zM4 10.5h16M8.5 4v4M15.5 4v4',
  'book-open':
    'M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13',
  users:
    'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 19c.5-3 2.8-5 5.5-5s5 2 5.5 5M16 11a2.5 2.5 0 1 0 0-5M17.5 14c1.8.5 3 2.2 3.3 4.5',
  globe:
    'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5s-1.2 6.2-3.5 8.5M12 3.5C9.7 5.8 8.5 8.6 8.5 12s1.2 6.2 3.5 8.5',
  badge:
    'M12 3l2.2 1.6 2.7-.2.9 2.6 2.3 1.4-.7 2.6.7 2.6-2.3 1.4-.9 2.6-2.7-.2L12 19.4l-2.2-1.6-2.7.2-.9-2.6-2.3-1.4.7-2.6-.7-2.6L6.2 7l.9-2.6 2.7.2zM9 11.5l2 2 4-4',
  target:
    'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z',
  flame:
    'M12 21c-3.6 0-6-2.5-6-5.8 0-3.5 3-5.2 3.6-9.2 2.6 1.7 4 4 4 6.3 1-.6 1.6-1.6 1.8-2.8 1.6 1.6 2.6 3.6 2.6 5.7 0 3.3-2.4 5.8-6 5.8z',
  compass: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM15.5 8.5l-2 5-5 2 2-5z',
  trophy:
    'M8 4.5h8v5a4 4 0 0 1-8 0zM8 6.5H5a3 3 0 0 0 3 4M16 6.5h3a3 3 0 0 1-3 4M12 13.5v3M8.5 19.5h7M10 16.5h4v3h-4z',
  presentation:
    'M3.5 4.5h17M5 4.5v10h14v-10M12 14.5v3M8.5 20l3.5-2.5 3.5 2.5M8.5 11l2.5-2.5 2 2 3-3',
  graduation:
    'M2.5 9.5 12 5l9.5 4.5L12 14zM6.5 11.5v4c1.5 1.5 3.4 2.2 5.5 2.2s4-.7 5.5-2.2v-4M21.5 9.5v5',
  mic: 'M12 14.5a3 3 0 0 0 3-3v-5a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zM6.5 11a5.5 5.5 0 0 0 11 0M12 16.5v4M9 20.5h6',
  star: 'M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.2 15.2 20 20',
  heart:
    'M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6c0 5.3-7.5 9.7-7.5 9.7z',
} as const;

export type IconName = keyof typeof ICON_PATHS;

@Component({
  selector: 'nh-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'nh-icon' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" focusable="false">
      <path [attr.d]="path()" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1.125rem;
      height: 1.125rem;
      flex: none;
    }

    svg {
      width: 100%;
      height: 100%;
      stroke-width: 1.4;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly path = computed(() => ICON_PATHS[this.name()]);
}
