import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FormSubmissionService } from '../../../core/services/form-submission.service';
import { NewsletterSection } from './newsletter-section';

describe('NewsletterSection', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterSection],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(NewsletterSection);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const submissions = TestBed.inject(FormSubmissionService);
    return { fixture, element, submissions };
  };

  const type = (element: HTMLElement, selector: string, value: string) => {
    const input = element.querySelector<HTMLInputElement>(selector);
    if (!input) {
      throw new Error(`Missing input ${selector}`);
    }
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const submit = async (fixture: Awaited<ReturnType<typeof setup>>['fixture']) => {
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  };

  it('blocks submission and explains the errors when the form is invalid', async () => {
    const { fixture, element, submissions } = await setup();
    const spy = vi.spyOn(submissions, 'submitNewsletter');

    await submit(fixture);

    expect(spy).not.toHaveBeenCalled();
    expect(element.textContent).toContain('Este campo é obrigatório.');
    expect(element.textContent).toContain('É necessário autorizar o envio para continuar.');
  });

  it('is honest when no backend is configured', async () => {
    const { fixture, element } = await setup();
    type(element, '#newsletter-name', 'Ana Souza');
    type(element, '#newsletter-email', 'ana@example.com');
    const consent = element.querySelector<HTMLInputElement>('input[type="checkbox"]');
    consent?.click();

    await submit(fixture);

    expect(element.textContent).toContain('O cadastro online ainda não está disponível.');
    expect(element.textContent).not.toContain('Cadastro realizado.');
  });

  it('silently drops submissions that filled the honeypot', async () => {
    const { fixture, element, submissions } = await setup();
    const spy = vi.spyOn(submissions, 'submitNewsletter');
    type(element, '#newsletter-name', 'Bot');
    type(element, '#newsletter-email', 'bot@example.com');
    type(element, '#newsletter-website', 'https://spam.example.com');
    element.querySelector<HTMLInputElement>('input[type="checkbox"]')?.click();

    await submit(fixture);

    expect(spy).not.toHaveBeenCalled();
  });
});
