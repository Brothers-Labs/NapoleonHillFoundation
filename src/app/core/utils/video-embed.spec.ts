import { buildVideoEmbedUrl } from './video-embed';

describe('buildVideoEmbedUrl', () => {
  it('uses the privacy-enhanced YouTube domain', () => {
    expect(buildVideoEmbedUrl({ provider: 'youtube', videoId: 'dQw4w9WgXcQ' })).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1',
    );
  });

  it('builds a do-not-track Vimeo URL', () => {
    expect(buildVideoEmbedUrl({ provider: 'vimeo', videoId: '76979871' })).toBe(
      'https://player.vimeo.com/video/76979871?autoplay=1&dnt=1',
    );
  });

  it.each([
    { provider: 'youtube', videoId: 'x"><script>' },
    { provider: 'youtube', videoId: 'short' },
    { provider: 'vimeo', videoId: 'javascript:alert(1)' },
  ] as const)('rejects the unsafe id $videoId', (source) => {
    expect(buildVideoEmbedUrl(source)).toBeNull();
  });

  it('returns null for self-hosted files, which play in a <video> element', () => {
    expect(
      buildVideoEmbedUrl({ provider: 'file', src: '/videos/a.mp4', mimeType: 'video/mp4' }),
    ).toBeNull();
  });
});
