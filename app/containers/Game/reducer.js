import { fromJS } from 'immutable';

import { MOVE_OBJECTS } from './actions';
import moveObjects from './moveObjects';

export const initialState = fromJS({
  angle: 45,
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action);
    default:
      return state;
  }
}

export default gameReducer;
