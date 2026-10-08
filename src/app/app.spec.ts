import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { CONTACT_CONFIG } from './core/config/contact.config';
import { toWhatsAppUrl } from './core/utils/whatsapp';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the skip link, header, main landmark and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.nh-skip-link')?.textContent).toContain('Pular para o conteúdo');
    expect(element.querySelector('nh-header nav[aria-label="Navegação principal"]')).not.toBeNull();
    expect(element.querySelector('main#conteudo')).not.toBeNull();
    expect(element.querySelector('nh-footer footer')).not.toBeNull();
  });

  it('links the floating WhatsApp button to the configured number', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a.whatsapp');

    // Rendered exactly when CONTACT_CONFIG.whatsapp is set, pointing at that number.
    expect(button?.getAttribute('href') ?? null).toBe(toWhatsAppUrl(CONTACT_CONFIG.whatsapp));
    expect(button?.getAttribute('rel')).toContain('noopener');
  });
});
