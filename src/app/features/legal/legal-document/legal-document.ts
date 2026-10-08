import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { LegalDocument } from '../../../data/legal.data';

const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

@Component({
  selector: 'nh-legal-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="legal nh-section nh-theme-paper">
      <div class="nh-container nh-container--narrow legal__body">
        <p class="legal__updated">
          Última atualização:
          <time [attr.datetime]="document().lastUpdated">{{ formattedDate() }}</time>
        </p>
        <ng-content />
        @for (section of document().sections; track section.id) {
          <section class="legal__section" [attr.aria-labelledby]="'legal-' + section.id">
            <h2 class="legal__title" [id]="'legal-' + section.id">{{ section.title }}</h2>
            @for (paragraph of section.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </section>
        }
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    .legal__body {
      display: grid;
      gap: var(--nh-space-7);
    }

    .legal__updated {
      font-size: var(--nh-text-sm);
      color: var(--nh-text-subtle);
    }

    .legal__section {
      display: grid;
      gap: var(--nh-space-4);
      color: var(--nh-text-muted);
    }

    .legal__title {
      font-size: var(--nh-heading-3);
      color: var(--nh-text);
    }
  `,
})
export class LegalDocumentView {
  readonly document = input.required<LegalDocument>();

  protected readonly formattedDate = computed(() =>
    DATE_FORMATTER.format(new Date(`${this.document().lastUpdated}T00:00:00Z`)),
  );
}
