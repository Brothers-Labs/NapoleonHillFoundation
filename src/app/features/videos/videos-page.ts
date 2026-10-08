import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { VideosSection } from './videos-section/videos-section';

@Component({
  selector: 'nh-videos-page',
  imports: [PageHero, VideosSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-videos-section />
  `,
})
export class VideosPage {
  protected readonly intro = PAGE_INTROS.videos;
  protected readonly breadcrumb = PAGE_METADATA.videos.breadcrumb;
}
