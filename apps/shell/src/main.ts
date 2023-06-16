import { setRemoteDefinitions } from '@nx/angular/mf';
import { RouterService } from './app/services/router.service';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    console.log(definitions);
    setRemoteDefinitions(definitions)
    RouterService.initMicroFrontendRoutes(definitions)
      .then(() => import('./bootstrap').catch((err) => console.error(err)));
  });
