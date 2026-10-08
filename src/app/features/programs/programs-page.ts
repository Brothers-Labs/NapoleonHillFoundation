import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { NewsletterSection } from '../contact/newsletter-section/newsletter-section';
import { ProgramsSection } from './programs-section/programs-section';

@Component({
  selector: 'nh-programs-page',
  imports: [PageHero, ProgramsSection, NewsletterSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-programs-section [showPageLink]="false" />
    <nh-newsletter-section />
  `,
})
export class ProgramsPage {
  protected readonly intro = PAGE_INTROS.programs;
  protected readonly breadcrumb = PAGE_METADATA.programs.breadcrumb;
}
