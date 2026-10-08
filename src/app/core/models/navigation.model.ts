export interface NavigationLink {
  readonly kind: 'link';
  readonly id: string;
  readonly label: string;
  readonly route: string;
  readonly fragment?: string;
  /** Home section that marks this link as active while it is in view. */
  readonly sectionId?: string;
}

export interface NavigationGroup {
  readonly kind: 'group';
  readonly id: string;
  readonly label: string;
  /** Destination used where groups cannot expand, such as the mobile menu heading. */
  readonly route: string;
  readonly children: readonly NavigationLink[];
}

export type NavigationEntry = NavigationLink | NavigationGroup;

export interface FooterColumn {
  readonly id: string;
  readonly title: string;
  readonly links: readonly NavigationLink[];
}
