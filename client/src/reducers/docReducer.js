import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState.documents, action) {
  switch (action.type) {
    case types.LOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { allDocuments: action.docs });
    case types.GET_DOCUMENT:
      return Object.assign({}, state, { currentDoc: state.allDocuments[action.id] });
    case types.CLEAR_USER_DOCS:
      return Object.assign({}, state, { allDocuments: [], currentDoc: {} });
    case types.LOAD_PUBLIC_DOCS_SUCCESS:
      return Object.assign({}, state, { publicDocs: action.publicDocs });
    default:
      return state;
  }
}
