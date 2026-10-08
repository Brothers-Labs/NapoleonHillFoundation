import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOBILE_NAVIGATION, PRIMARY_CALL_TO_ACTION } from '../../core/config/navigation.config';
import { BrandMark } from '../../shared/components/brand-mark/brand-mark';
import { Dialog } from '../../shared/components/dialog/dialog';

@Component({
  selector: 'nh-mobile-menu',
  imports: [RouterLink, BrandMark, Dialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
})
export class MobileMenu {
  readonly open = model(false);

  protected readonly callToAction = PRIMARY_CALL_TO_ACTION;
  protected readonly entries = MOBILE_NAVIGATION.map((entry, index) => ({
    entry,
    number: String(index + 1).padStart(2, '0'),
  }));

  protected close(): void {
    this.open.set(false);
  }
}
