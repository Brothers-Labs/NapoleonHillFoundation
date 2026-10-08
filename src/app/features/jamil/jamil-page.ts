import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { JAMIL_PROFILE } from '../../data/jamil.data';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { BrazilSection } from '../brazil/brazil-section/brazil-section';
import { ProgramsSection } from '../programs/programs-section/programs-section';
import { JamilSection } from './jamil-section/jamil-section';

@Component({
  selector: 'nh-jamil-page',
  imports: [PageHero, JamilSection, BrazilSection, ProgramsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" [image]="heroImage" />
    <nh-jamil-section [isDetailed]="true" />
    <nh-brazil-section />
    <nh-programs-section />
  `,
})
export class JamilPage {
  protected readonly intro = PAGE_INTROS.jamil;
  protected readonly breadcrumb = PAGE_METADATA.jamil.breadcrumb;
  protected readonly heroImage = JAMIL_PROFILE.pagePortrait;
}
