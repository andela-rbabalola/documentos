import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState.documents, action) {
  switch (action.type) {
    case types.LOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { documents: action.docs });
    case types.GET_DOCUMENT:
      return Object.assign({}, state, { currentDoc: state.documents[action.id] });
    default:
      return state;
  }
}
