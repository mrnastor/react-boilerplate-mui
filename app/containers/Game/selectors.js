import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectGame = state => state.get('game', initialState);

/**
 * Select the language locale
 */

const makeSelectAngle = () =>
  createSelector(selectGame, gameState => gameState.get('angle'));

export { selectGame, makeSelectAngle };
