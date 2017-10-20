import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { Row } from '../constants';
import {getStore} from '../router';
import { getColumn } from '../selector/column';

let column = 12;
setTimeout(() => {
  column = getColumn(getStore().getState());
});
const IFoodRecord = Immutable.Record({
  food: Immutable.fromJS(
    {
      x: Math.floor(Math.random() * column),
      y: Math.floor(Math.random() * Row)
    }
  )
});

export class IFood extends IFoodRecord {
  food: any;
}

const initialState = new (IFood);

export default handleActions({
  'set food'(state: IFood = initialState) {
    const food = {
      x: Math.floor(Math.random() * column),
      y: Math.floor(Math.random() * Row)
    };
    return state.set('food', Immutable.fromJS(food));
  }
}, initialState);
