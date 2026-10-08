export type ScrollDepthEventName = 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_90';

export type AnalyticsEventName =
  | 'hero_philosophy_click'
  | 'hero_brazil_click'
  | 'program_click'
  | 'jamil_profile_click'
  | 'video_play'
  | 'gallery_open'
  | 'material_download'
  | 'newsletter_start'
  | 'newsletter_submit'
  | 'whatsapp_click'
  | 'contact_start'
  | 'contact_submit'
  | 'external_foundation_click'
  | ScrollDepthEventName;

export type AnalyticsParams = Readonly<Record<string, string | number | boolean>>;

export const SCROLL_DEPTH_THRESHOLDS: readonly (readonly [number, ScrollDepthEventName])[] = [
  [25, 'scroll_25'],
  [50, 'scroll_50'],
  [75, 'scroll_75'],
  [90, 'scroll_90'],
];
