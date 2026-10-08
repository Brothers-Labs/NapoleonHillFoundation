import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { FOUNDATION_CONTENT } from '../../data/institutional.data';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { TimelineSection } from '../napoleon-hill/timeline-section/timeline-section';
import { FoundationMission } from './foundation-mission/foundation-mission';
import { FoundationSection } from './foundation-section/foundation-section';

@Component({
  selector: 'nh-foundation-page',
  imports: [PageHero, FoundationMission, FoundationSection, TimelineSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" [image]="heroImage" />
    <nh-foundation-mission />
    <nh-timeline-section />
    <nh-foundation-section [showPageLink]="false" />
  `,
})
export class FoundationPage {
  protected readonly intro = PAGE_INTROS.foundation;
  protected readonly breadcrumb = PAGE_METADATA.foundation.breadcrumb;
  protected readonly heroImage = FOUNDATION_CONTENT.pageImage;
}
