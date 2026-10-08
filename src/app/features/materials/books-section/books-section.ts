import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BOOKS, BOOKS_COPY } from '../../../data/books.data';
import { ActionLink } from '../../../shared/components/action-link/action-link';
import { BookCover, type BookCoverTone } from '../../../shared/components/book-cover/book-cover';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

const COVER_TONES: readonly BookCoverTone[] = ['navy', 'black', 'ivory'];

@Component({
  selector: 'nh-books-section',
  imports: [ActionLink, BookCover, SectionHeading, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="books nh-section nh-theme-light" aria-labelledby="books-title">
      <div class="nh-container">
        <nh-section-heading class="books__heading" [copy]="copy" titleId="books-title" />

        <ul class="books__grid">
          @for (book of books; track book.id; let index = $index) {
            <li class="book" nhReveal [nhRevealDelay]="index * 110">
              <nh-book-cover [book]="book" [tone]="tones[index % tones.length]" />
              <div class="book__body">
                <p class="book__year">{{ book.year }}</p>
                <h3 class="book__title">
                  <span lang="en">{{ book.originalTitle }}</span>
                </h3>
                @if (book.portugueseTitle; as portugueseTitle) {
                  <p class="book__translation">No Brasil: {{ portugueseTitle }}</p>
                }
                <p class="book__description">{{ book.description }}</p>
                @if (book.action; as action) {
                  <nh-action-link [action]="action" appearance="link" />
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .books__heading {
      margin-bottom: var(--nh-space-8);
    }

    .books__grid {
      display: grid;
      gap: var(--nh-space-8) var(--nh-space-7);
      margin: 0;
      padding: 0;
      list-style: none;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .book {
      display: grid;
      grid-template-columns: minmax(0, 8rem) minmax(0, 1fr);
      align-items: start;
      gap: var(--nh-space-5);

      @media (min-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--nh-space-6);
      }
    }

    nh-book-cover {
      @media (min-width: 768px) {
        max-width: 16rem;
      }
    }

    .book__body {
      display: grid;
      justify-items: start;
      gap: var(--nh-space-2);
    }

    .book__year {
      font-size: var(--nh-text-xs);
      letter-spacing: 0.12em;
      color: var(--nh-accent);
    }

    .book__title {
      font-size: var(--nh-heading-3);
      line-height: 1.1;
    }

    .book__translation {
      font-family: var(--nh-font-serif);
      font-size: var(--nh-text-lg);
      font-style: italic;
      color: var(--nh-text-muted);
    }

    .book__description {
      font-size: var(--nh-text-sm);
      color: var(--nh-text-muted);
    }
  `,
})
export class BooksSection {
  protected readonly copy = BOOKS_COPY;
  protected readonly books = BOOKS;
  protected readonly tones = COVER_TONES;
}
