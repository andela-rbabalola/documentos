import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes';

export function loginUserSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user,
    isSuperAdmin: jwt.decode(localStorage.getItem('JWT')).RoleId === 1
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

export function reauthenticateUser(isSuperAdmin) {
  if (isSuperAdmin === undefined) {
    return {
      type: types.REAUTHENTICATE,
      isAuthenticated: true
    };
  }
  return {
    type: types.REAUTHENTICATE,
    isAuthenticated: true,
    isSuperAdmin
  };
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_USER,
    isAuthenticated: false,
    isSuperAdmin: false
  };
}

export function clearUserDocs() {
  return {
    type: types.CLEAR_USER_DOCS
  };
}

export function clearCurrentRole() {
  return {
    type: types.CLEAR_CURRENT_ROLE
  };
}

export function searchDocumentsSuccess(results) {
  return {
    type: types.SEARCH_DOCS_SUCCESS,
    results
  };
}

export function login(user) {
  return dispatch => axios.post('/api/users/signin', user)
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('JWT', token);
      if (jwt.decode(token).RoleId === 1) {
        localStorage.setItem('SuperAdmin', true);
      }
      localStorage.setItem('isAuthenticated', true);
      dispatch(loginUserSuccess({
        userInfo: jwt.decode(token),
        email: res.data.email
      }));
    });
}

export function searchDocuments(query) {
  return dispatch => axios.get(`/api/search/documents/?q=${query}`)
    .then((res) => {
      dispatch(searchDocumentsSuccess(res.data));
    });
}

export function setUserInState(token) {
  return (dispatch) => {
    dispatch(setUserSuccess(jwt.decode(token)));
  };
}

// isSuperAdmin is a boolean indicating if the user is a superadmin or not
export function reauthenticate(isSuperAdmin) {
  return (dispatch) => {
    if (isSuperAdmin === undefined) {
      dispatch(reauthenticateUser());
      dispatch(setUserInState(localStorage.getItem('JWT')));
    } else {
      dispatch(reauthenticateUser(isSuperAdmin));
      dispatch(setUserInState(localStorage.getItem('JWT')));
    }
  };
}

// newUser is an object that contains the new user's details
export function signup(newUser) {
  return dispatch => axios.post('/api/users', newUser).then((res) => {
    const token = res.data.token;
    axios.defaults.headers.common['x-access-token'] = token;
    localStorage.setItem('JWT', token);
    localStorage.setItem('isAuthenticated', true);
    dispatch(signUpSuccess({
      userInfo: jwt.decode(token),
      email: res.data.newUser.email
    }));
  });
}

export function logout() {
  return (dispatch) => {
    // clear local storage
    localStorage.clear();
    // remove user details from state
    dispatch(logoutSuccess());
    // we also need to clear docs from state too
    dispatch(clearUserDocs());
    // clear current role
    dispatch(clearCurrentRole());
  };
}

