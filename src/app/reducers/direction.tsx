import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
const IDirectionRecord = Immutable.Record({
  current: 3,
  next: 3
});

export class IDirection extends IDirectionRecord {
  snake: number;
}

const initialState = new IDirection();

export default handleActions(
  {
    'set snake current direction'(state: IDirection, action: any) {
      return state.set('current', action.payload);
    },
    'set snake next direction'(state: IDirection, action: any) {
      return state.set('next', action.payload);
    },
    'init snake'(state: IDirection) {
      return state.set('current', 3).set('next', 3);
    }
  },
  initialState
);
