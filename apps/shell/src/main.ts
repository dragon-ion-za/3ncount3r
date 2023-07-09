import { setRemoteDefinitions } from '@nx/angular/mf';
import { RouterService } from './app/services/router.service';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    console.log(definitions);
    let remoteDefinitions: Record<string, string> = {};

    for (let definition of definitions) {
      remoteDefinitions[definition.remoteName] = definition.remoteEntry;
    }

    setRemoteDefinitions(remoteDefinitions)
    RouterService.initMicroFrontendRoutes(definitions)
      .then(() => import('./bootstrap').catch((err) => console.error(err)));
  });
