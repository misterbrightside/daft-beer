import { SET_BEER_PAGE } from '../actions/client-api';

function beerPage(state = {}, action) {
  switch(action.type) {
    case SET_BEER_PAGE:
      return action.beer;
    default:
      return state;
  }
}

export default beerPage;