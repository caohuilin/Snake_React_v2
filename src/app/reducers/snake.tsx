import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
const ISnakeRecord = Immutable.Record({
  snake: Immutable.fromJS([
    {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 1
    }
  ])
});

export class ISnake extends ISnakeRecord {
  snake: any;
}

const initialState = new (ISnake);

export default handleActions({
  'set snake'(state: ISnake = initialState, action: any) {
    return state.set('snake', Immutable.fromJS(action.payload));
  }
}, initialState);
