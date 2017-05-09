import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BeerSearch from './containers/BeerSearch';
import RandomBeer from './containers/RandomBeer';
import App from './containers/App';
import BeerPage from './containers/BeerPage';

const HomePage = () => (
  <div>
    <RandomBeer />
    <BeerSearch />
  </div>
);

const Routes = () => (
  <App>
    <Route exact path={'/'} component={HomePage} />
    <Route path={'/search'} component={BeerSearch} />
    <Route path={'/beers/:id'} component={BeerPage} />
  </App>
);

export default Routes;