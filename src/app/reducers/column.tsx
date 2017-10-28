import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { MaxColumn, MinColumn } from '../constants';
const IColumnRecord = Immutable.Record({
  cnt: MinColumn
});

export class IColumn extends IColumnRecord {
  cnt: any;
}

const initialState = new (IColumn);

export default handleActions({
  'reset column'(state: IColumn, action: any) {
    const cnt = action.payload < MinColumn ? MinColumn : (action.payload > MaxColumn ? MaxColumn : action.payload);
    return state.set('cnt', cnt);
  }
}, initialState);
