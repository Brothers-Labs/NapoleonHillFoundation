import { CONTACT_CONFIG } from '../config/contact.config';
import { buildWhatsAppUrl, toWhatsAppUrl } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me link with the encoded message', () => {
    expect(buildWhatsAppUrl('5511912345678', 'Olá! Tudo bem?')).toBe(
      'https://wa.me/5511912345678?text=Ol%C3%A1!%20Tudo%20bem%3F',
    );
  });

  it('omits the text parameter for an empty message', () => {
    expect(buildWhatsAppUrl('5511912345678', '')).toBe('https://wa.me/5511912345678');
  });

  it.each(['+55 11 91234-5678', '123', '55119123456789012', 'abc5511912345'])(
    'rejects the malformed number "%s"',
    (number) => {
      expect(() => buildWhatsAppUrl(number, 'Olá')).toThrowError(/Invalid WhatsApp number/);
    },
  );
});

describe('toWhatsAppUrl', () => {
  it('returns null while no channel is configured', () => {
    expect(toWhatsAppUrl(null)).toBeNull();
  });

  it('accepts the currently configured channel', () => {
    expect(() => toWhatsAppUrl(CONTACT_CONFIG.whatsapp)).not.toThrow();
  });
});
