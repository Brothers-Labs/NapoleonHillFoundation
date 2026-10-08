import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Every known route is prerendered to static HTML at build time, so metadata, OpenGraph tags
 * and JSON-LD are present without a runtime server. Unknown URLs fall back to the client.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
