import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  model,
  viewChild,
} from '@angular/core';
import { injectBrowserWindow } from '../../../core/utils/browser';
import { Icon } from '../icon/icon';

export type DialogVariant = 'center' | 'drawer' | 'fullscreen' | 'media';

/**
 * Accessible modal built on the native `<dialog>` element: the browser provides the focus trap,
 * the inert background, Escape to close and focus restoration on close.
 *
 * Usage: `<nh-dialog [(open)]="isOpen" labelledBy="title-id">…</nh-dialog>`.
 */
@Component({
  selector: 'nh-dialog',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  readonly open = model(false);
  readonly variant = input<DialogVariant>('center');
  readonly labelledBy = input.required<string>();
  readonly closeLabel = input('Fechar');

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly isBrowser = injectBrowserWindow() !== null;

  constructor() {
    effect(() => {
      const element = this.dialog().nativeElement;
      const shouldBeOpen = this.open();
      if (!this.isBrowser || shouldBeOpen === element.open) {
        return;
      }
      // Engines without the modal API (very old browsers, jsdom) fall back to the plain attribute.
      if (typeof element.showModal !== 'function') {
        element.toggleAttribute('open', shouldBeOpen);
      } else if (shouldBeOpen) {
        element.showModal();
      } else {
        element.close();
      }
    });
  }

  close(): void {
    this.open.set(false);
  }

  /** Syncs state when the browser closes the dialog itself (Escape key). */
  protected onNativeClose(): void {
    this.open.set(false);
  }

  /** The dialog element fills the viewport; a click that lands on it is outside the panel. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }
}
