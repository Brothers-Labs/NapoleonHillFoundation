export type SocialNetwork = 'instagram' | 'youtube' | 'linkedin' | 'facebook';

export interface SocialProfile {
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string;
}

/*
 * TODO: validar com Jamil Albuquerque os perfis oficiais antes da publicação.
 * Exemplo: { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/<perfil>' }
 */
export const SOCIAL_PROFILES: readonly SocialProfile[] = [];
