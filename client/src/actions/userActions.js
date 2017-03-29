import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';

export function loginUserSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function signUpSuccess(newUser) {
  return {
    type: types.SIGNUP_SUCCESS,
    newUser
  };
}

export function setUserSuccess(userDetails) {
  return {
    type: types.SET_USER,
    userDetails
  };
}

export function reauthenticateUser() {
  return {
    type: types.REAUTHENTICATE,
    isAuthenticated: true
  };
}

export function login(user) {
  return (dispatch) => {
    return axios.post('/users/signin', user).then((res) => {
      const token = res.data.token;
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('JWT', token);
      localStorage.setItem('isAuthenticated', true);
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('JWT');
      dispatch(loginUserSuccess({
        userInfo: jwt.decode(token),
        email: res.data.email
      }));
    });
  };
}

export function reauthenticate() {
  return (dispatch) => {
    dispatch(reauthenticateUser());
  };
}

// newUser is an object that contains the new user's details
export function signup(newUser) {
  return (dispatch) => {
    return axios.post('/users', newUser).then((res) => {
      const token = res.data.token;
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('JWT', token);
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('JWT');
      dispatch(signUpSuccess({
        userInfo: jwt.decode(token),
        email: res.data.newUser.email
      }));
    });
  };
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_USER
  };
}

export function setUserInState(token) {
  return (dispatch) => {
    dispatch(setUserSuccess(jwt.decode(token)));
  };
}

export function logout() {
  return (dispatch) => {
    // remove token from user's system
    localStorage.removeItem('JWT');
    localStorage.removeItem('isAuthenticated');
    dispatch(logoutSuccess);
  };
}
