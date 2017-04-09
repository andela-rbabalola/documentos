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

export function loadPublicSuccess(publicDocs) {
  return {
    type: types.LOAD_PUBLIC_DOCS_SUCCESS,
    publicDocs
  };
}


// create action for error handling
export function loadDocuments() {
  return dispatch => axios.get('/api/documents', {
    headers: {
      'x-access-token': localStorage.getItem('JWT')
    }
  }).then((res) => {
    // Here we filter the response to get just the public documents
    const publicDocs = [];
    res.data.forEach((doc) => {
      if (doc.access === 'public') {
        publicDocs.push(doc);
      }
    });
    dispatch(loadPublicSuccess(publicDocs));
    // filter private docs??
    dispatch(loadDocsSuccess(res.data));
  });
}

export function deleteDocument(id) {
  return dispatch => axios.delete(`/api/documents/${id}`).then(() => {
    dispatch(loadDocuments());
  }).catch((err) => {
    throw (err);
  });
}

export function createDocument(document) {
  return dispatch => axios.post('/api/documents', document).then(() => {
    dispatch(loadDocuments());
  }).catch((err) => {
    throw (err);
  });
}

export function updateDocument(updatedDocument) {
  return dispatch => axios.put(`/api/documents/${updatedDocument.docId}`, updatedDocument).then(() => {
    dispatch(loadDocuments());
  }).catch((err) => {
    throw (err);
  });
}

