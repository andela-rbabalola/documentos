import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function rolesReducer(state = initialState.manageRoles, action) {
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      return Object.assign({}, state, { allRoles: action.allRoles });
    default:
      return state;
  }
}
