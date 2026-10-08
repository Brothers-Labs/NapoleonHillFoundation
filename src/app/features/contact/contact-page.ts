import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { ContactSection } from './contact-section/contact-section';
import { NewsletterSection } from './newsletter-section/newsletter-section';

@Component({
  selector: 'nh-contact-page',
  imports: [PageHero, ContactSection, NewsletterSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-contact-section />
    <nh-newsletter-section />
  `,
})
export class ContactPage {
  protected readonly intro = PAGE_INTROS.contact;
  protected readonly breadcrumb = PAGE_METADATA.contact.breadcrumb;
}
