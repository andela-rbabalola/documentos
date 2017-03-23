import { combineReducers } from 'redux';
import signin from './signinReducer';

const rootReducer = combineReducers({
  signin
});

export default rootReducer;
