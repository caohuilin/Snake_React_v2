import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
// import { MaxColumn, MinColumn } from '../constants';
const ISizeRecord = Immutable.Record({
  column: 0,
  row: 0
});

export class ISize extends ISizeRecord {
  column: number;
  row: number;
}

const initialState = new ISize();

export default handleActions(
  {
    'reset size'(state: ISize, action: any) {
      const { column, row } = action.payload;
      return Immutable.fromJS({
        column: column,
        row: row
      });
    }
  },
  initialState
);
