import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorization';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export function login(user) {
  return (dispatch) => {
    return axios.post('/users/signin', user.user).then((res) => {
      const token = res.data.token;
      localStorage.setItem('JWT', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}
