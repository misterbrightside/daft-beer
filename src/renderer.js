import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import getStore from './reducers';
import Routes from './routes';
import { Provider } from 'react-redux';

import indexHTML from './views/index';

const renderer = (req, res) => {
  console.log(req.url);
  const store = getStore();
  const context = {};
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
  const preloadedState = store.getState();
  return res.send(indexHTML(markup, preloadedState));
}

export default renderer;