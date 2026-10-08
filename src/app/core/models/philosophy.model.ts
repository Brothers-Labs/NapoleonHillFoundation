import type { IconName } from '../../shared/components/icon/icon';

export interface SuccessPrinciple {
  readonly order: number;
  readonly name: string;
  /** Original English name, kept to make terminology validation traceable. */
  readonly originalName: string;
  readonly summary: string;
  /** Shown when the principle is featured on the home page. */
  readonly icon?: IconName;
}

export interface TimelineEvent {
  readonly id: string;
  /** Four-digit year, or a label such as "Hoje" for the present. */
  readonly period: string;
  readonly label: string;
}

export interface LegacyHighlight {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly icon: IconName;
}
