import { handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { Column } from '../constants';
const IColumnRecord = Immutable.Record({
  cnt: Column
});

export class IColumn extends IColumnRecord {
  cnt: any;
}

const initialState = new (IColumn);

export default handleActions({
  'reset column'(state: IColumn, action: any) {
    const cnt = action.payload < Column ? Column : action.payload;
    return state.set('cnt', cnt);
  }
}, initialState);
