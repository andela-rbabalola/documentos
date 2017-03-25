import { combineReducers } from 'redux';
import signin from './signinReducer';
import createDoc from './docReducer';

// ADD REDUCER FOR DOCS

const rootReducer = combineReducers({
  signin,
  createDoc
});

export default rootReducer;
