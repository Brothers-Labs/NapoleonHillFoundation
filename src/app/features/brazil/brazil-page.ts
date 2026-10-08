import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { JamilSection } from '../jamil/jamil-section/jamil-section';
import { ProgramsSection } from '../programs/programs-section/programs-section';
import { BrazilSection } from './brazil-section/brazil-section';

@Component({
  selector: 'nh-brazil-page',
  imports: [PageHero, BrazilSection, JamilSection, ProgramsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-brazil-section [showPageLink]="false" />
    <nh-jamil-section />
    <nh-programs-section />
  `,
})
export class BrazilPage {
  protected readonly intro = PAGE_INTROS.brazil;
  protected readonly breadcrumb = PAGE_METADATA.brazil.breadcrumb;
}
