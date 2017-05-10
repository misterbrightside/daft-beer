import path from 'path';
import { polyfill } from 'es6-promise';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
import {
  getRandomBeer,
  searchAPI,
  getAssociatedBeersFromBrewery
} from './actions/server-api';

polyfill();

function initServer() {
  const app = Express();
  const server = new Server(app);

  app.use('/static', Express.static(path.join(__dirname, 'static')));
  app.use(cors());

  app.get('/api/beer/:id', (req, res) => {
    const { id } = req.params;
    getBeer(id)
      .then(json => res.json(json)); 
  })

  app.get('/api/beers/random', (req, res) => {
    getRandomBeer()
      .then(json => res.json(json))
  });

  app.get('/api/search', (req, res) => {
    const { query, type } = req.query;
    searchAPI(query, type)
      .then(json => res.json(json));
  });

  app.get('/api/brewery/:breweryId/beers', (req, res) => {
    const { breweryId } = req.params;
    getAssociatedBeersFromBrewery(breweryId)
      .then(json => res.json(json));
  });

  const PORT = 3000;
  server.listen(PORT, error => {
    if (error) console.log(error);
    else console.log(`⭐️️ Server listening on port ${PORT}! Application should be running at http://localhost:8080.`);
  });
}

initServer();