import expect from 'expect';
import * as userActions from '../../actions/userActions';
import * as types from '../../actions/actionTypes';

describe('USER ACTIONS', () => {
  describe('Signup Success', () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: 'john123'
    };
    const expectedAction = {
      type: types.SIGNUP_SUCCESS,
      newUser
    };
    const action = userActions.signUpSuccess(newUser);

    expect(action).toEqual(expectedAction);
  });

  describe('Search Success', () => {
    const query = { query: 'query' };
    const results = { query: 'query' };
    const expectedAction = {
      type: types.SEARCH_DOCS_SUCCESS,
      results
    };
    const action = userActions.searchDocumentsSuccess(query);

    expect(action).toEqual(expectedAction);
  });
});
