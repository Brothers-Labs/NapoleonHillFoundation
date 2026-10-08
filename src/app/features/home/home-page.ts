import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionAnchorDirective } from '../../shared/directives/section-anchor.directive';
import { BrazilSection } from '../brazil/brazil-section/brazil-section';
import { NewsletterSection } from '../contact/newsletter-section/newsletter-section';
import { FoundationSection } from '../foundation/foundation-section/foundation-section';
import { JamilSection } from '../jamil/jamil-section/jamil-section';
import { HillIntroSection } from '../napoleon-hill/hill-intro-section/hill-intro-section';
import { TimelineSection } from '../napoleon-hill/timeline-section/timeline-section';
import { PrinciplesSection } from '../philosophy/principles-section/principles-section';
import { ProgramsSection } from '../programs/programs-section/programs-section';
import { ClosingSection } from './closing-section/closing-section';
import { HeroSection } from './hero-section/hero-section';
import { LegacyStrip } from './legacy-strip/legacy-strip';

/**
 * The institutional narrative, in the order of the visual mock: impact → who Hill was → the
 * work → the principles → the foundation → Brazil → Jamil Albuquerque → programs → action.
 */
@Component({
  selector: 'nh-home-page',
  imports: [
    SectionAnchorDirective,
    HeroSection,
    LegacyStrip,
    HillIntroSection,
    TimelineSection,
    PrinciplesSection,
    FoundationSection,
    BrazilSection,
    JamilSection,
    ProgramsSection,
    ClosingSection,
    NewsletterSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nh-hero-section nhSection="inicio" />
    <nh-legacy-strip nhSection="legado" />
    <nh-hill-intro-section nhSection="napoleon-hill" />
    <nh-timeline-section nhSection="obra" />
    <nh-principles-section nhSection="filosofia" />
    <nh-foundation-section nhSection="fundacao" />
    <nh-brazil-section nhSection="brasil" />
    <nh-jamil-section nhSection="jamil-albuquerque" />
    <nh-programs-section nhSection="programas" />
    <nh-closing-section nhSection="o-legado-continua" />
    <nh-newsletter-section nhSection="newsletter" />
  `,
})
export class HomePage {}
