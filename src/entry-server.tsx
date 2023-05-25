import { renderToPipeableStream, RenderToReadableStreamOptions } from 'react-dom/server';

import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export function render(url: string, store: ToolkitStore, options: RenderToReadableStreamOptions) {
  return renderToPipeableStream(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </React.StrictMode>,
    options
  );
}
