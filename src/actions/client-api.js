import fetch from 'isomorphic-fetch';

export const SET_RANDOM_BEER = 'SET_RANDOM_BEER';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const NO_SEARCH_RESULTS = 'NO_SEARCH_RESULTS';
export const RESET_SEARCH = 'RESET_SEARCH';
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export const SET_BEER_PAGE = 'SET_BEER_PAGE';
export const SET_QUERY_FILTER = 'SET_QUERY_FILTER';

export function setRandomBeer(beer) {
  return {
    type: SET_RANDOM_BEER,
    beer
  }
}

export function setSearchData(searchResults) {
  return {
    type: SET_SEARCH_RESULTS,
    searchResults
  }
}

export function noResultsFound() {
  return {
    type: NO_SEARCH_RESULTS
  }
}

export function resetSearch() {
  return {
    type: RESET_SEARCH
  }
}

export function getRandomBeer() {
  return dispatch => {
    fetch(`${BASE_API_URL}/api/beers/random`)
      .then(res => res.json())
      .then(json => dispatch(setRandomBeer(json.data)));
  }
}

export function setCurrentPath(path) {
  return {
    type: SET_CURRENT_PATH,
    path
  }
}

export function setBeerPage(beer) {
  return {
    type: SET_BEER_PAGE,
    beer
  }
}

export function setQueryFilter(query) {
  return {
    type: SET_QUERY_FILTER,
    query
  }
}

const processSearchResults = (dispatch, json, type = '') => {
  const results = json.data ? json.data
    .filter(result => result.labels && result.description || type === 'brewery')
    .sort((a, b) => a.nameDisplay.localeCompare(b.nameDisplay)) : [];
  results ? dispatch(setSearchData(results)) : dispatch(noResultsFound());
};

export function searchAPI(query, type) {
  return dispatch => {
    if (query) {
      fetch(`${BASE_API_URL}/api/search?query=${query}&type=${type}`)
        .then(res => res.json())
        .then(json => processSearchResults(dispatch, json, type));
    } else {
      dispatch(resetSearch())
    }
  };
}

export function getMoreBeersFromBrewery() {
  return (dispatch, getState) => {
    const [ brewery ] = getState().randomBeer.breweries;
    fetch(`${BASE_API_URL}/api/brewery/${brewery.id}/beers`)
      .then(res => res.json())
      .then(json => processSearchResults(dispatch, json))
  };
}

export function getBeer(id) {
  return (dispatch, getState) => {
    const state = getState();
    const storedBeerCheck = state.searchResults.data.filter(beer => beer.id === id);
    if (state.randomBeer.id !== id && !storedBeerCheck) {
      fetch(`${BASE_API_URL}/api/beer/${id}`)
        .then(res => res.json())
        .then(json => setBeerPage(json.data));
    }
  }
}