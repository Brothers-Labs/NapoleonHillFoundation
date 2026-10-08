export interface PostalAddress {
  readonly street: string;
  readonly locality: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface PhoneNumber {
  /** E.164 value used in `tel:` links. */
  readonly value: string;
  readonly display: string;
}

export interface WhatsAppChannel {
  /** International format, digits only: country code + area code + number. */
  readonly number: string;
  readonly displayNumber: string;
  readonly defaultMessage: string;
}

export interface ContactConfig {
  readonly phones: readonly PhoneNumber[];
  readonly whatsapp: WhatsAppChannel | null;
  readonly email: string | null;
  readonly address: PostalAddress | null;
  /** Google Maps embed URL. Requires a confirmed address. */
  readonly mapEmbedUrl: string | null;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Conheci a Napoleon Hill Brasil pelo site e gostaria de saber mais.';

/*
 * Source: visual mock delivered on 2026-10-07.
 * TODO: validar com Jamil Albuquerque antes da publicação (telefones, WhatsApp, e-mail e endereço).
 * Components hide anything left empty, so a removed value never becomes a broken link.
 */
export const CONTACT_CONFIG: ContactConfig = {
  phones: [
    { value: '+551639115859', display: '+55 16 3911-5859' },
    { value: '+551130311619', display: '+55 11 3031-1619' },
  ],
  whatsapp: {
    number: '5516991966659',
    displayNumber: '+55 16 99196-6659',
    defaultMessage: WHATSAPP_DEFAULT_MESSAGE,
  },
  email: 'contato@napoleonhill.org.br',
  address: {
    street: 'Av. Brigadeiro Faria Lima, 1572, Conj. 308',
    locality: 'São Paulo',
    region: 'SP',
    postalCode: '01451-917',
    country: 'BR',
  },
  mapEmbedUrl:
    'https://www.google.com/maps?q=Av.+Brigadeiro+Faria+Lima,+1572,+S%C3%A3o+Paulo+-+SP,+01451-917&output=embed',
};
