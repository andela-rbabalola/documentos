import axios from 'axios';
import * as types from './actionTypes';

// export function createDocumentSuccess(data) {
//   return {
//     type: types.CREATE_DOC_SUCCESS,
//     data
//   };
// }

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
      'x-access-token': localStorage.getItem('JWT') } }).then((res) => {
        dispatch(loadDocsSuccess(res.data));
      });
}

export function createDocument(document) {
  return dispatch => axios.post('/documents', document).then((res) => {
    // call loadDocuments so that we load the documents
    // again after creating a document
    // check if the documents exists before creating
    if (res.data.newDocument) {
      loadDocuments();
    } else {
      // handle failure cases here
    }
  });
}

export function getDoc(id) {
  return {
    type: types.GET_DOCUMENT,
    id
  };
}
