import { createRoot } from 'react-dom/client';
import App from "../app/App";
import { environment } from '../environments/environment';

export class AppWebComponent extends HTMLElement {
    connectedCallback() {
      const root = createRoot(this);
      root.render(<App baseName='/3ncount3r' authDomain={environment.auth.domain} authClientId={environment.auth.clientId} />);
    }
  }
  customElements.define('spa-3ncount3r-app', AppWebComponent);