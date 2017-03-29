import axios from 'axios';
import * as types from './actionTypes';

export function loadDocsSuccess(docs) {
  return {
    type: types.LOAD_DOCS_SUCCESS,
    docs
  };
}

// create action for error handling
export function loadDocuments() {
  return dispatch => axios.get('/documents', {
    headers: {
      'x-access-token': localStorage.getItem('JWT')
    }
  }).then((res) => {
    dispatch(loadDocsSuccess(res.data));
  });
}

export function createDocument(document) {
  return dispatch => axios.post('/documents', document).then(() => {
    dispatch(loadDocuments());
  }).catch((err) => {
    throw (err);
  });
}

export function getDoc(id) {
  return {
    type: types.GET_DOCUMENT,
    id
  };
}
