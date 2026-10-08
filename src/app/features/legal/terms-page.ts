import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { TERMS_OF_USE } from '../../data/legal.data';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { LegalDocumentView } from './legal-document/legal-document';

@Component({
  selector: 'nh-terms-page',
  imports: [PageHero, LegalDocumentView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-legal-document [document]="terms" />
  `,
})
export class TermsPage {
  protected readonly intro = PAGE_INTROS.terms;
  protected readonly breadcrumb = PAGE_METADATA.terms.breadcrumb;
  protected readonly terms = TERMS_OF_USE;
}
