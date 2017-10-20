import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
const IDirectionRecord = Immutable.Record({
  snake: 3
});

export class IDirection extends IDirectionRecord {
  snake: number;
}

const initialState = new (IDirection);

export default handleActions({
  'set snake direction'(state: IDirection, action: any) {
    return state.set('snake', action.payload);
  }
}, initialState);
