import fetch from 'isomorphic-fetch';

const API_KEY = '5a5ff041c46d3260545ce2c3b5533683';
const optionParams = params => Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

const url = (resource, params) => `http://api.brewerydb.com/v2/${resource}?${optionParams(params)}`;

export const getResource = resource => {
  return fetch(url(resource, { key: API_KEY }), {
    mode: 'cors',
  }).then(res => res.json());
};