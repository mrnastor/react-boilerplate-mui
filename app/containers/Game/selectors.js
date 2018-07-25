import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGame = state => state.get('game', initialState);

const makeSelectAngle = () =>
  createSelector(selectGame, gameState => gameState.get('angle'));

export { selectGame, makeSelectAngle };
