import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorization';

export function setCurrentUser(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function login(user) {
  return (dispatch) => {
    return axios.post('/users/signin', user.user).then((res) => {
      const token = res.data.token;
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('JWT', token);
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('JWT');
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}
