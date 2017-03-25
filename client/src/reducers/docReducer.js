import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_DOC_SUCCESS:
      return [
        ...state, Object.assign({}, action.document)
      ];
    case types.LOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { documents: action.docs });
    case types.GET_DOCUMENT:
      console.log('action ', action);
      console.log('state ', state);
      console.log('new state ', Object.assign({}, state, { currentDoc: state.documents[action.id] }));
      return Object.assign({}, state, { currentDoc: state.documents[action.id] });
    default:
      return state;
  }
}
