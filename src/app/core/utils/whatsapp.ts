import type { WhatsAppChannel } from '../config/contact.config';

const WHATSAPP_NUMBER_PATTERN = /^\d{10,15}$/;

/**
 * Builds a `wa.me` deep link. Throws on malformed numbers: a broken contact channel is a
 * configuration bug that must surface in tests, not a silently dead button.
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  if (!WHATSAPP_NUMBER_PATTERN.test(number)) {
    throw new Error(
      `Invalid WhatsApp number "${number}": use digits only, including the country code.`,
    );
  }
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${query}`;
}

/** Deep link for a configured channel, or `null` while no official number exists. */
export function toWhatsAppUrl(channel: WhatsAppChannel | null): string | null {
  return channel ? buildWhatsAppUrl(channel.number, channel.defaultMessage) : null;
}
