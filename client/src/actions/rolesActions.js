import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';

export function getRolesSuccess(allRoles) {
  return {
    type: types.GET_ROLES_SUCCESS,
    allRoles
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
