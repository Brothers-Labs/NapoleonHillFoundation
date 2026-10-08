import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((error: unknown) => {
  // Reveal states depend on the app; if it never boots, show all content instead of hiding it.
  document.documentElement.classList.remove('nh-motion');
  console.error('[bootstrap] The application failed to start.', error);
});
