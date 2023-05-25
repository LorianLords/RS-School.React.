import { RootState, setupStore } from './store';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState | undefined;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;
debugger;
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
console.log('hydrated');
