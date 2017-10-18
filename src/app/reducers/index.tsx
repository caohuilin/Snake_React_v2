import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import column from './column';
import snake from './snake';
import direction from './direction';

const rootReducer = combineReducers({
  routing,
  column,
  snake,
  direction
});

export default rootReducer;
