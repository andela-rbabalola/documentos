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

export function login(user) {
  return (dispatch) => {
    return axios.post('/users/signin', user).then((res) => {
      const token = res.data.token;
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('JWT', token);
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('JWT');
      dispatch(loginUserSuccess({
        userInfo: jwt.decode(token),
        email: res.data.email
      }));
    });
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

export function setUserInState(token) {
  return (dispatch) => {
    dispatch(setUserSuccess(jwt.decode(token)));
  };
}
