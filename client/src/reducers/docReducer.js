import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.CREATE_DOC_SUCCESS:
      return [
        ...state, Object.assign({}, action.document)
      ];
    default:
      return state;
  }
}
