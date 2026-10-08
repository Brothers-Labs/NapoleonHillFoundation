import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { BooksSection } from '../materials/books-section/books-section';
import { HillIntroSection } from './hill-intro-section/hill-intro-section';
import { TimelineSection } from './timeline-section/timeline-section';

@Component({
  selector: 'nh-napoleon-hill-page',
  imports: [PageHero, HillIntroSection, TimelineSection, BooksSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-hill-intro-section [isDetailed]="true" />
    <nh-timeline-section />
    <nh-books-section />
  `,
})
export class NapoleonHillPage {
  protected readonly intro = PAGE_INTROS.napoleonHill;
  protected readonly breadcrumb = PAGE_METADATA.napoleonHill.breadcrumb;
}
