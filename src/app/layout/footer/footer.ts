import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/analytics/consent.service';
import { CONTACT_CONFIG } from '../../core/config/contact.config';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../../core/config/navigation.config';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SOCIAL_PROFILES } from '../../core/config/social.config';
import { injectBrowserWindow } from '../../core/utils/browser';
import { toWhatsAppUrl } from '../../core/utils/whatsapp';
import { BrandMark } from '../../shared/components/brand-mark/brand-mark';
import { Icon } from '../../shared/components/icon/icon';
import { TrackDirective } from '../../shared/directives/track.directive';

@Component({
  selector: 'nh-footer',
  imports: [RouterLink, BrandMark, Icon, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly consent = inject(ConsentService);
  private readonly window = injectBrowserWindow();

  protected readonly columns = FOOTER_COLUMNS;
  protected readonly legalLinks = LEGAL_LINKS;
  protected readonly socialProfiles = SOCIAL_PROFILES;
  protected readonly contact = CONTACT_CONFIG;
  protected readonly whatsappUrl = toWhatsAppUrl(CONTACT_CONFIG.whatsapp);
  protected readonly hasContactChannels =
    CONTACT_CONFIG.email !== null ||
    CONTACT_CONFIG.phones.length > 0 ||
    CONTACT_CONFIG.address !== null ||
    this.whatsappUrl !== null;
  protected readonly message = SITE_CONFIG.footerMessage;
  protected readonly internationalUrl = SITE_CONFIG.internationalFoundationUrl;
  protected readonly copyrightHolder = SITE_CONFIG.legalEntityName ?? SITE_CONFIG.name;
  protected readonly currentYear = new Date().getFullYear();

  protected openCookiePreferences(): void {
    this.consent.reopen();
  }

  protected scrollToTop(): void {
    this.window?.scrollTo({ top: 0 });
  }
}
