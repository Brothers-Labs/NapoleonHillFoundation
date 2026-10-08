import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  FEATURED_PRINCIPLE_ORDERS,
  SUCCESS_PRINCIPLES,
} from '../../../data/success-principles.data';
import { PrinciplesSection, type PrinciplesVariant } from './principles-section';

describe('PrinciplesSection', () => {
  const setup = async (variant: PrinciplesVariant) => {
    await TestBed.configureTestingModule({
      imports: [PrinciplesSection],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(PrinciplesSection);
    fixture.componentRef.setInput('variant', variant);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  };

  const drawerTitle = (element: HTMLElement) =>
    element.querySelector('#principle-drawer-title')?.textContent?.trim();

  it('features the selected principles on the home variant', async () => {
    const { element } = await setup('featured');
    const names = [...element.querySelectorAll('button.card .card__name')].map((node) =>
      node.textContent?.trim(),
    );
    const expected = FEATURED_PRINCIPLE_ORDERS.map(
      (order) => SUCCESS_PRINCIPLES.find((principle) => principle.order === order)?.name,
    );
    expect(names).toEqual(expected);
    expect(element.querySelector('a[href="/filosofia"]')?.textContent).toContain(
      `${SUCCESS_PRINCIPLES.length} princípios`,
    );
  });

  it('lists every principle as a keyboard-accessible button on the complete variant', async () => {
    const { element } = await setup('complete');
    expect(element.querySelectorAll('button.principle').length).toBe(SUCCESS_PRINCIPLES.length);
  });

  it('opens the drawer with the chosen principle and cycles with next/previous', async () => {
    const { fixture, element } = await setup('complete');

    element.querySelectorAll<HTMLButtonElement>('button.principle')[0]?.click();
    await fixture.whenStable();
    expect(drawerTitle(element)).toBe(SUCCESS_PRINCIPLES[0]?.name);

    const previous = element.querySelectorAll<HTMLButtonElement>('.drawer__navigation button')[0];
    previous?.click();
    await fixture.whenStable();
    expect(drawerTitle(element)).toBe(SUCCESS_PRINCIPLES.at(-1)?.name);
  });
});
