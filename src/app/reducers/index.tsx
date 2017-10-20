import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import column from './column';
import snake from './snake';
import direction from './direction';
import food from './food';

const rootReducer = combineReducers({
  routing,
  column,
  snake,
  direction,
  food
});

export default rootReducer;
