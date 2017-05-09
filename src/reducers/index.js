import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import randomBeer from './beers';
import searchResults from './searchResults';
import currentPath from './currentPath';
import beerPage from './beerPage';
import queryFilter from './queryFilter';
import thunk from 'redux-thunk';

const reducers = combineReducers({ 
  randomBeer, 
  searchResults,
  currentPath,
  beerPage,
  queryFilter
});

const getStore = (preloadedState = undefined) => {
  const store = createStore(reducers, preloadedState, compose(
    applyMiddleware(thunk),
    autoRehydrate()
  ));
  persistStore(store, { blacklist: 'queryFilter' });
  return store;
};

export default getStore;