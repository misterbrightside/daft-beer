import { SET_CURRENT_PATH } from '../actions/client-api';

function currentPath(state = '', action) {
  switch(action.type) {
    case SET_CURRENT_PATH:
      return action.path;
    default:
      return state;
  }
}

export default currentPath;