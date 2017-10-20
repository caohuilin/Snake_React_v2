import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';

const IGameRecord = Immutable.Record({
  init: -1,
  code: 0,
});

export class IGame extends IGameRecord {
  init: number;
}

const initialState = new (IGame);

export default handleActions({
  'set game init'(state: IGame, action: any) {
    return state.set('init', action.payload);
  },
  'get code'(state: IGame) {
    return state.set('code', state.get('code') + 1);
  },
  'clear code'(state: IGame) {
    return state.set('code', 0);
  }
}, initialState);
