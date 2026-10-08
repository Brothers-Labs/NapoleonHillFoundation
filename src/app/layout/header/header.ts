import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { HEADER_NAVIGATION, PRIMARY_CALL_TO_ACTION } from '../../core/config/navigation.config';
import type { NavigationLink } from '../../core/models/navigation.model';
import { ActiveSectionService } from '../../core/services/active-section.service';
import { injectBrowserWindow } from '../../core/utils/browser';
import { BrandMark } from '../../shared/components/brand-mark/brand-mark';
import { Icon } from '../../shared/components/icon/icon';
import { MobileMenu } from '../mobile-menu/mobile-menu';

const SCROLLED_OFFSET_PX = 24;
const HOME_DEFAULT_SECTION = 'inicio';

function toPath(url: string): string {
  return url.split(/[?#]/)[0] || '/';
}

@Component({
  selector: 'nh-header',
  imports: [RouterLink, BrandMark, Icon, MobileMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeGroup()',
  },
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly activeSection = inject(ActiveSectionService);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  protected readonly navigation = HEADER_NAVIGATION;
  protected readonly callToAction = PRIMARY_CALL_TO_ACTION;
  protected readonly isScrolled = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly openGroupId = signal<string | null>(null);

  protected readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => toPath(event.urlAfterRedirects)),
    ),
    { initialValue: toPath(this.router.url) },
  );

  /** Ids of the entries to highlight: the visible section on home, the current route elsewhere. */
  protected readonly activeIds = computed(() => {
    const path = this.currentPath();
    const activeSectionId = this.activeSection.activeSectionId() ?? HOME_DEFAULT_SECTION;
    const isActive = (link: NavigationLink): boolean =>
      path === '/'
        ? link.sectionId === activeSectionId
        : link.route !== '/' && (path === link.route || path.startsWith(`${link.route}/`));

    const ids = new Set<string>();
    for (const entry of this.navigation) {
      const links = entry.kind === 'link' ? [entry] : entry.children;
      if (links.some(isActive)) {
        ids.add(entry.id);
      }
    }
    return ids;
  });

  constructor() {
    const window = injectBrowserWindow();
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!window) {
        return;
      }
      let frame: number | null = null;
      const update = () => {
        frame = null;
        this.isScrolled.set(window.scrollY > SCROLLED_OFFSET_PX);
      };
      const onScroll = () => {
        frame ??= window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleGroup(id: string): void {
    this.openGroupId.update((current) => (current === id ? null : id));
  }

  protected closeGroup(): void {
    this.openGroupId.set(null);
  }

  protected onDocumentClick(event: MouseEvent): void {
    const group = this.host.querySelector('.header__group');
    if (this.openGroupId() && group && !group.contains(event.target as Node)) {
      this.closeGroup();
    }
  }
}
