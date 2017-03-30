import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';

export function getRolesSuccess(allRoles) {
  return {
    type: types.GET_ROLES_SUCCESS,
    allRoles
  };
}

export function getRole(index) {
  return {
    type: types.GET_A_ROLE_SUCCESS,
    index
  };
}

export function getRoles() {
  return (dispatch) => axios.get('/roles', {
    headers: {
      'x-access-token': localStorage.getItem('JWT')
    }
  }).then((res) => {
    dispatch(getRolesSuccess(res.data));
  });
}

export function updateRole(updatedRole) {
  return dispatch => axios.put(`/roles/${updatedRole.roleId}`, updatedRole).then(() => {
    dispatch(getRoles());
  }).catch((err) => {
    throw (err);
  });
}
