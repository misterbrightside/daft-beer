import { 
  SET_SEARCH_RESULTS,
  NO_SEARCH_RESULTS,
  RESET_SEARCH,
  SET_QUERY_FILTER
} from '../actions/client-api';

function searchResults(state = { data: [], successfulSearch: false }, action) {
  switch(action.type) {
    case SET_SEARCH_RESULTS:
      return { data: action.searchResults, successfulSearch: true };
    case NO_SEARCH_RESULTS: 
      return { data: [], successfulSearch: true };
    case RESET_SEARCH: 
      return { data: [], successfulSearch: false };
    default:
      return state;
  }
}

export default searchResults;