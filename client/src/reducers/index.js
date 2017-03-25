import { combineReducers } from 'redux';
import signin from './signinReducer';
import manageDocs from './docReducer';

// ADD REDUCER FOR DOCS

const rootReducer = combineReducers({
  signin,
  manageDocs
});

export default rootReducer;
