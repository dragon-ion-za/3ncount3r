import { createRoot } from 'react-dom/client';
import EncountersMenu from '../components/modules/encounters-menu/encounters-menu';

export class EncounterMenuWebComponent extends HTMLElement {
    connectedCallback() {
      const root = createRoot(this);
      root.render(<EncountersMenu isExpanded={false} />);
    }
  }
  customElements.define('spa-3ncount3r-menu', EncounterMenuWebComponent);