import { setRemoteDefinitions } from '@proof/load-remote-module';
import '../module-federation.config';
import('./bootstrap');

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
