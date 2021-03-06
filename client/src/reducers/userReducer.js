import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.manageUser, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state,
        {
          user: action.user
        }, { isAuthenticated: !isEmpty(action.user), isSuperAdmin: action.isSuperAdmin });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state,
        {
          user: action.newUser,
        }, { isAuthenticated: !isEmpty(action.newUser) });
    case types.SET_USER:
      return Object.assign({}, state,
        {
          currentUser: action.userDetails
        }, { isAuthenticated: !isEmpty(action.userDetails) });
    case types.LOGOUT_USER:
      return Object.assign({}, state,
        {
          user: {},
          currentUser: {},
        }, { isAuthenticated: action.isAuthenticated, isSuperAdmin: action.isSuperAdmin });
    case types.REAUTHENTICATE:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        isSuperAdmin: action.isSuperAdmin
      });
    case types.SEARCH_DOCS_SUCCESS:
      return Object.assign({}, state, { searchResults: action.results });
    default:
      return state;
  }
}
