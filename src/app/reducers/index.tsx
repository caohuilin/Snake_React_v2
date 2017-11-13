import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import size from './size';
import snake from './snake';
import direction from './direction';
import food from './food';
import game from './game';

const rootReducer = combineReducers({
  routing,
  size,
  snake,
  direction,
  food,
  game
});

export default rootReducer;
