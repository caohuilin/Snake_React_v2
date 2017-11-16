import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';

const IGameRecord = Immutable.Record({
  init: -1,
  code: 0,
  modal: 0,
  pause: false,
  volume: true,
  time: 0
});

export class IGame extends IGameRecord {
  init: number;
  code: number;
  modal: number;
  pause: boolean;
  volume: boolean;
  time: number;
}

const initialState = new IGame();

export default handleActions(
  {
    'set game time'(state: IGame, action: any) {
      return state.set('time', state.get('time') + 1);
    },
    'set game init'(state: IGame, action: any) {
      return state.set('init', action.payload);
    },
    'get code'(state: IGame) {
      return state.set('code', state.get('code') + 1);
    },
    'clear code'(state: IGame) {
      return state.set('code', 0);
    },
    'set modal'(state: IGame, action: any) {
      const modal = state.get('modal');
      return state.set('modal', modal ? 0 : 1);
    },
    'pause game'(state: IGame, action: any) {
      return state.set(
        'pause',
        action.payload ? action.payload.pause : !state.get('pause')
      );
    },
    'set volume'(state: IGame) {
      return state.set('volume', !state.get('volume'));
    }
  },
  initialState
);
