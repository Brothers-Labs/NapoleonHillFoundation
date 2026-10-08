import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { GallerySection } from './gallery-section/gallery-section';

@Component({
  selector: 'nh-gallery-page',
  imports: [PageHero, GallerySection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-gallery-section />
  `,
})
export class GalleryPage {
  protected readonly intro = PAGE_INTROS.gallery;
  protected readonly breadcrumb = PAGE_METADATA.gallery.breadcrumb;
}
