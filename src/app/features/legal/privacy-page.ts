import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_CONFIG } from '../../core/config/contact.config';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PAGE_METADATA } from '../../core/seo/page-metadata';
import { PRIVACY_POLICY } from '../../data/legal.data';
import { PAGE_INTROS } from '../../data/page-intros.data';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { LegalDocumentView } from './legal-document/legal-document';

@Component({
  selector: 'nh-privacy-page',
  imports: [PageHero, LegalDocumentView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-page-hero [copy]="intro" [breadcrumb]="breadcrumb" />
    <nh-legal-document [document]="policy">
      <section class="controller" aria-labelledby="privacy-controller">
        <h2 id="privacy-controller">Controlador dos dados</h2>
        @if (controllerName) {
          <p>
            {{ controllerName }}
            @if (privacyEmail) {
              · Contato para assuntos de privacidade:
              <a [href]="'mailto:' + privacyEmail">{{ privacyEmail }}</a>
            }
          </p>
        } @else {
          <p>A identificação do controlador e o canal do encarregado serão publicados em breve.</p>
        }
      </section>
    </nh-legal-document>
  `,
  styles: `
    .controller {
      display: grid;
      gap: var(--nh-space-3);
      padding: var(--nh-space-5);
      border-left: 1px solid var(--nh-accent);
      background: rgb(22 22 22 / 3%);
      color: var(--nh-text-muted);

      h2 {
        font-size: var(--nh-text-xl);
        color: var(--nh-text);
      }

      a {
        color: var(--nh-accent);
      }
    }
  `,
})
export class PrivacyPage {
  protected readonly intro = PAGE_INTROS.privacy;
  protected readonly breadcrumb = PAGE_METADATA.privacy.breadcrumb;
  protected readonly policy = PRIVACY_POLICY;
  protected readonly controllerName = SITE_CONFIG.legalEntityName;
  protected readonly privacyEmail = CONTACT_CONFIG.email;
}
