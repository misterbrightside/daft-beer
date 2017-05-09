import { SET_RANDOM_BEER } from '../actions/client-api';

function randomBeer(state = {}, action) {
  switch(action.type) {
    case SET_RANDOM_BEER:
      return action.beer;
    default:
      return state;
  }
}

export default randomBeer;