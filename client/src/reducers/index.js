import { combineReducers } from 'redux';
import users from './userReducer';
import documents from './docReducer';
import flashMessages from './flashReducer';
import roles from './rolesReducer';

const rootReducer = combineReducers({
  users,
  documents,
  roles,
  flashMessages
});

export default rootReducer;
