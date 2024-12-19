import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import { environment } from "./environments/environment";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App baseName='/' authDomain={environment.auth.domain} authClientId={environment.auth.clientId} />
  </StrictMode>
);
