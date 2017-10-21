import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { Row } from '../constants';
import { getStore } from '../router';
import { getColumn } from '../selector/column';
import { getModal } from '../selector/modal';

let column = 12;
let modal = 1;
setTimeout(() => {
  column = getColumn(getStore().getState());
  modal = getModal(getStore().getState());
});
const index = modal === 1 ? 3 : 1;
const x = Math.floor(Math.random() * (column - index)) + 1;
const y = Math.floor(Math.random() * (Row - index)) + 1;
const ISnakeRecord = Immutable.Record({
  snake: Immutable.fromJS([
    {
      x: x,
      y: y
    }, {
      x: x,
      y: y - 1
    }
  ])
});

export class ISnake extends ISnakeRecord {
  snake: any;
}

const initialState = new (ISnake);

export default handleActions({
  'init snake'(state: ISnake = initialState) {
    const modal = getModal(getStore().getState());
    const index = modal === 1 ? 3 : 1;
    const x = Math.floor(Math.random() * (column - index)) + 1;
    const y = Math.floor(Math.random() * (Row - index)) + 1;
    return state.set('snake', Immutable.fromJS([
      {
        x: x,
        y: y
      }, {
        x: x,
        y: y - 1
      }
    ]));
  },
  'set snake'(state: ISnake = initialState, action: any) {
    return state.set('snake', Immutable.fromJS(action.payload));
  }
}, initialState);
