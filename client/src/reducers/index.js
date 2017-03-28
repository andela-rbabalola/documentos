import { combineReducers } from 'redux';
import users from './userReducer';
import documents from './docReducer';

// ADD REDUCER FOR DOCS

const rootReducer = combineReducers({
  users,
  documents
});

export default rootReducer;
