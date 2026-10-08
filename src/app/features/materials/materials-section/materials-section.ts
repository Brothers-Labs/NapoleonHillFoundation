import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MaterialType } from '../../../core/models/catalog.model';
import { MATERIALS, MATERIALS_COPY } from '../../../data/media.data';
import { Icon } from '../../../shared/components/icon/icon';
import { MediaFrame } from '../../../shared/components/media-frame/media-frame';
import { PendingNotice } from '../../../shared/components/pending-notice/pending-notice';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TrackDirective } from '../../../shared/directives/track.directive';

const MATERIAL_TYPE_LABELS: Readonly<Record<MaterialType, string>> = {
  ebook: 'E-book',
  guide: 'Guia',
  article: 'Artigo',
  checklist: 'Checklist',
  'event-material': 'Material de evento',
};

@Component({
  selector: 'nh-materials-section',
  imports: [Icon, MediaFrame, PendingNotice, SectionHeading, RevealDirective, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="materials nh-section nh-theme-paper" aria-labelledby="materials-title">
      <div class="nh-container">
        <nh-section-heading class="materials__heading" [copy]="copy" titleId="materials-title" />

        @if (materials.length) {
          <ul class="materials__grid">
            @for (material of materials; track material.id; let index = $index) {
              <li class="material" nhReveal [nhRevealDelay]="(index % 3) * 90">
                <nh-media-frame
                  [image]="material.cover"
                  aspect="square"
                  [placeholderCaption]="typeLabels[material.type]"
                />
                <p class="material__type">{{ typeLabels[material.type] }}</p>
                <h3 class="material__name">{{ material.name }}</h3>
                <p class="material__description">{{ material.description }}</p>
                <p class="material__format">{{ material.format }}</p>
                <a
                  class="nh-button"
                  [href]="material.fileUrl"
                  download
                  nhTrack="material_download"
                  [nhTrackParams]="{ material: material.id }"
                >
                  <nh-icon name="download" />
                  Baixar material
                </a>
              </li>
            }
          </ul>
        } @else {
          <nh-pending-notice
            title="Novos materiais em preparação."
            description="Guias, artigos e materiais de apoio autorizados serão disponibilizados aqui."
            [showContactLink]="false"
          />
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .materials__heading {
      margin-bottom: var(--nh-space-8);
    }

    .materials__grid {
      display: grid;
      gap: var(--nh-space-8) var(--nh-space-6);
      margin: 0;
      padding: 0;
      list-style: none;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1280px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .material {
      display: grid;
      align-content: start;
      justify-items: start;
      gap: var(--nh-space-3);

      nh-media-frame {
        width: 100%;
        margin-bottom: var(--nh-space-3);
      }
    }

    .material__type {
      font-size: var(--nh-text-2xs);
      letter-spacing: var(--nh-tracking-eyebrow);
      text-transform: uppercase;
      color: var(--nh-accent);
    }

    .material__name {
      font-size: var(--nh-heading-3);
    }

    .material__description {
      color: var(--nh-text-muted);
    }

    .material__format {
      font-size: var(--nh-text-xs);
      color: var(--nh-text-subtle);
    }
  `,
})
export class MaterialsSection {
  protected readonly copy = MATERIALS_COPY;
  protected readonly materials = MATERIALS;
  protected readonly typeLabels = MATERIAL_TYPE_LABELS;
}
