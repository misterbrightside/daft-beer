import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from './routes';

import indexHTML from './views/index';

const renderer = (req, res) => {
  const markup = renderToString(
    <StaticRouter location={req.url}>
      <Routes />
    </StaticRouter>
  );
  return res.send(indexHTML(markup));
}

export default renderer;