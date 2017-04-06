import expect from 'expect';
import userReducer from '../../reducers/userReducer';
import * as actions from '../../actions/userActions';

describe('User Reducer', () => {
  it('Should create a new user when passed SIGNUP_SUCCESS', () => {
    const initialState = {
      user: {},
      isAuthenticated: false,
      allUsers: []
    };

    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: 'john123'
    };

    const action = actions.signUpSuccess(newUser);

    const newState = userReducer(initialState, action);
    expect(Object.keys(newState.user).length).toBe(4);
    expect(newState.isAuthenticated).toBeTruthy();
  });

  it('Should remove a user when passed LOGOUT_USER', () => {
    const initialState = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: 'john123'
      },
      isAuthenticated: true,
      allUsers: []
    };

    const action = actions.logoutSuccess();

    const newState = userReducer(initialState, action);
    expect(Object.keys(newState.user).length).toBe(0);
    expect(newState.isAuthenticated).toBeFalsy();
  });

  it('Should set current user when passed SET_USER', () => {
    const userDetails = {
      UserId: 1,
      RoleId: 1,
      email: 'john@gmail.com',
      iat: 1491264850,
      exp: 1491524050
    };

    const initialState = {
      user: {},
      isAuthenticated: true,
      currentUser: {},
      allUsers: []
    };

    const action = actions.setUserSuccess(userDetails);

    const newState = userReducer(initialState, action);
    expect(Object.keys(newState.currentUser).length).toBe(5);
    expect(newState.isAuthenticated).toBeTruthy();
  });
});
