import fetch from 'isomorphic-fetch';

const API_KEY = '5a5ff041c46d3260545ce2c3b5533683';
const optionParams = params => Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

const url = (resource, params) => `http://api.brewerydb.com/v2/${resource}?${optionParams(params)}`;

export const getResource = (resource, params) => {
  const urlToFetch = url(resource, Object.assign(params, { key: API_KEY }));
  console.log(urlToFetch);
  return fetch(urlToFetch, {
    mode: 'cors',
  }).then(res => res.json())
  .catch(error => console.log(error));
};

export const getRandomBeer = () => getResource(
  'beer/random', 
  { hasLabels: 'Y', withBreweries: 'Y' }
);

export const searchAPI = (query, type) => getResource(
  'search',
  { q: query, type }
);

export const getBeer = (id) => getResource(
  `beer/${id}`, {}
);

export const getAssociatedBeersFromBrewery = id => getResource(`brewery/${id}/beers`, {});