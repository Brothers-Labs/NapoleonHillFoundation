import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { NAPOLEON_HILL_PROFILE } from '../../data/napoleon-hill.data';
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
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" [image]="heroImage" />
    <nh-hill-intro-section [isDetailed]="true" />
    <nh-timeline-section />
    <nh-books-section />
  `,
})
export class NapoleonHillPage {
  protected readonly intro = PAGE_INTROS.napoleonHill;
  protected readonly breadcrumb = PAGE_METADATA.napoleonHill.breadcrumb;
  protected readonly heroImage = NAPOLEON_HILL_PROFILE.pagePortrait;
}
