import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { BooksSection } from './books-section/books-section';
import { MaterialsSection } from './materials-section/materials-section';

@Component({
  selector: 'nh-materials-page',
  imports: [PageHero, BooksSection, MaterialsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-books-section id="livros" />
    <nh-materials-section id="materiais" />
  `,
})
export class MaterialsPage {
  protected readonly intro = PAGE_INTROS.materials;
  protected readonly breadcrumb = PAGE_METADATA.materials.breadcrumb;
}
