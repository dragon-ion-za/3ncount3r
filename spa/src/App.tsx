import './App.css';
import React from 'react';
import {
  RouterProvider
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';

import router from './Router';
import { theme } from './theme'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    );
  }
}

export default App;
