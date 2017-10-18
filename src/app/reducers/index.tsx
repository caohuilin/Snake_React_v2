import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import column from './column';

const rootReducer = combineReducers({
  routing,
  column
});

export default rootReducer;
