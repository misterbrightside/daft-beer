import path from 'path';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
import Renderer from './renderer';
import { getResource } from './actions/api';

export default function initServer() {
  const app = Express();
  const server = new Server(app);

  app.use(Express.static(path.join(__dirname, 'static')));
  app.use(cors());

  app.get('/api', (req, res) => {
    getResource('').then(json => res.json(json))
  });

  app.get('*', Renderer);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, error => {
    if (error) console.log(error);
    else console.log(`⭐️️ Server listening on port ${PORT}.`);
  });
}