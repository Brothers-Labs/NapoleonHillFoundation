import { CONTACT_CONFIG } from '../../../core/config/contact.config';
import { isTrustedMapEmbed } from './contact-section';

describe('isTrustedMapEmbed', () => {
  it.each([
    ['https://www.google.com/maps/embed?pb=abc', true],
    ['https://www.google.com/maps?q=S%C3%A3o+Paulo&output=embed', true],
    ['https://www.google.com/maps?q=S%C3%A3o+Paulo', false],
    ['https://evil.example.com/maps/embed?pb=abc', false],
    ['javascript:alert(1)', false],
  ])('%s → %s', (url, expected) => {
    expect(isTrustedMapEmbed(url)).toBe(expected);
  });

  it('accepts the configured map', () => {
    if (CONTACT_CONFIG.mapEmbedUrl) {
      expect(isTrustedMapEmbed(CONTACT_CONFIG.mapEmbedUrl)).toBe(true);
    }
  });
});
