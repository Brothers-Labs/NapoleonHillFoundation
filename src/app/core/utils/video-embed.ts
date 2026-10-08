import type { VideoSource } from '../models/media.model';

const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;
const VIMEO_ID_PATTERN = /^\d{6,12}$/;

/**
 * Returns the privacy-friendly embed URL for a provider video, or `null` for self-hosted files
 * and invalid IDs. IDs are validated because the URL is later trusted as a resource URL.
 */
export function buildVideoEmbedUrl(source: VideoSource): string | null {
  switch (source.provider) {
    case 'youtube':
      return YOUTUBE_ID_PATTERN.test(source.videoId)
        ? `https://www.youtube-nocookie.com/embed/${source.videoId}?autoplay=1&rel=0&modestbranding=1`
        : null;
    case 'vimeo':
      return VIMEO_ID_PATTERN.test(source.videoId)
        ? `https://player.vimeo.com/video/${source.videoId}?autoplay=1&dnt=1`
        : null;
    case 'file':
      return null;
  }
}
