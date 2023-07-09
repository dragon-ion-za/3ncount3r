import { createRoot } from 'react-dom/client';
import App from "../app/App";

export class AppWebComponent extends HTMLElement {
    connectedCallback() {
      const root = createRoot(this);
      root.render(<App />);
    }
  }
  customElements.define('spa-3ncount3r-app', AppWebComponent);