import React from 'react';
import {
  RouterProvider
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '../theme'
import createRouter from '../Router';

interface AppProps {
  baseName: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={createRouter(this.props.baseName)} />
      </ThemeProvider>
    );
  }
}

export default App;