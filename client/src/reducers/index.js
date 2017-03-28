import { combineReducers } from 'redux';
import users from './userReducer';
import documents from './docReducer';
import flashMessages from './flashMessages';

// ADD REDUCER FOR DOCS

const rootReducer = combineReducers({
  users,
  documents,
  flashMessages
});

export default rootReducer;
