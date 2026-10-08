import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { ProgramsSection } from '../programs/programs-section/programs-section';
import { PrinciplesSection } from './principles-section/principles-section';

@Component({
  selector: 'nh-philosophy-page',
  imports: [PageHero, PrinciplesSection, ProgramsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-principles-section variant="complete" />
    <nh-programs-section />
  `,
})
export class PhilosophyPage {
  protected readonly intro = PAGE_INTROS.philosophy;
  protected readonly breadcrumb = PAGE_METADATA.philosophy.breadcrumb;
}
