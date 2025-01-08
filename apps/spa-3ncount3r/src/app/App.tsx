import React from 'react';
import {
  RouterProvider
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';

import { theme } from '../theme'
import createRouter from '../Router';
import { EncounterContextProvider } from '../providers/encounterContext/encounter.context-provider';
import { BusyLoadingContextProvider } from '../providers/busy-loading-context/busy-loading.context-provider';
import { BusyLoading } from '../components/modules/busy-loading/busy-loading';
import { PartyContextProvider } from '../providers/party-context/party.context-provider';

interface AppProps {
  baseName: string;
  authDomain: string;
  authClientId: string;
}

class App extends React.Component<AppProps> {  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider domain={this.props.authDomain} clientId={this.props.authClientId}>
          <EncounterContextProvider>
            <PartyContextProvider>
              <BusyLoadingContextProvider>
                <BusyLoading></BusyLoading>
                <RouterProvider router={createRouter(this.props.baseName)} />
              </BusyLoadingContextProvider>
            </PartyContextProvider>
          </EncounterContextProvider>
        </Auth0Provider>
      </ThemeProvider>
    );
  }
}

export default App;