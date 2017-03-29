import axios from 'axios';
import * as types from './actionTypes';

export function loadDocsSuccess(docs) {
  return {
    type: types.LOAD_DOCS_SUCCESS,
    docs
  };
}

export function getDoc(id) {
  return {
    type: types.GET_DOCUMENT,
    id
  };
}

// updated is an object containing the updated document
export function updateDocumentSuccess(updated) {
  return {
    type: types.UPDATE_DOC_SUCCESS,
    updated
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

export function updateDocument(updatedDocument) {
  return dispatch => axios.put(`/documents/${updatedDocument.docId}`, updatedDocument).then(() => {
    dispatch(loadDocuments());
  }).catch((err) => {
    throw (err);
  });
}

