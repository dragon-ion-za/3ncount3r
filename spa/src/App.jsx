import './App.css';
import React from 'react';
import {
  RouterProvider
} from "react-router-dom";

import router from './Router.tsx';

class App extends React.Component {
  render() {
    return (
      <RouterProvider router={router} />
    );
  }
}

export default App;
