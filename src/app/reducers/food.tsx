import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { getStore } from '../router';
import { getSize } from '../selector/column';
import { getModal } from '../selector/modal';

let column = 0;
let row = 0;
let modal = 1;
setTimeout(() => {
  const size = getSize(getStore().getState());
  column = size.column;
  row = size.row;
  modal = getModal(getStore().getState());
});
const IFoodRecord = Immutable.Record({
  food: Immutable.fromJS({
    x: 0,
    y: modal
  })
});

export class IFood extends IFoodRecord {
  food: {
    x: number;
    y: number;
  };
}

const initialState = new IFood();

const setFood = (state) => {
  const modal = getModal(getStore().getState());
  const index = modal === 1 ? 3 : 1;
  const x = Math.floor(Math.random() * (column - index)) + 1;
  const y = Math.floor(Math.random() * (row - index)) + 1;
  if (y === modal) {
    return state;
  }
  const food = {
    x: x,
    y: y
  };
  return state.set('food', Immutable.fromJS(food));
}
export default handleActions(
  {
    'set food'(state: IFood = initialState) {
      return setFood(state);
    },
    'set modal'(state: IFood = initialState) {
      return setFood(state);
    }
  },
  initialState
);
