import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ThemeProvider, Theme } from 'react-switch-theme';
import * as serviceWorker from './serviceWorker';

const colors = {
  elsa_light: {
    shade: '#f4eeff',
    accent: '#a6b1e1',
    shade_inverse: '#424874',
  },
  dark: {
    shade: '#21243D',
    shade_inverse: '#FF7C7C',
    accent: '#FF7C7C',
  },
};
const activeMode = 'elsa_light';
const offlineStorageKey = 'elsa_do';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      colors={colors}
      activeMode={activeMode}
      offlineStorageKey={offlineStorageKey}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
