import { 
  SET_QUERY_FILTER
} from '../actions/client-api';

function searchResults(state = '', action) {
  switch(action.type) {
    case SET_QUERY_FILTER:
      return action.query;
    default:
      return state;
  }
}

export default searchResults;