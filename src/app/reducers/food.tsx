import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { Row } from '../constants';
// import { store } from '../router';
// import { getColumn } from '../selector/column';

const IFoodRecord = Immutable.Record({
  food: Immutable.fromJS(
    {
      x: Math.floor(Math.random() * Row),
      y: Math.floor(Math.random() * 12)
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
      x: Math.floor(Math.random() * Row),
      y: Math.floor(Math.random() * 12)
    };
    return state.set('food', Immutable.fromJS(food));
  }
}, initialState);
