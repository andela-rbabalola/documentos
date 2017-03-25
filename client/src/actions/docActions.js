import axios from 'axios';
import * as types from './actionTypes';

export function setDocument(document) {
  return {
    type: types.CREATE_DOC_SUCCESS,
    document
  };
}

export function loadDocsSuccess(docs) {
  return {
    type: types.LOAD_DOCS_SUCCESS,
    docs
  };
}

export function createDocument(document) {
  return dispatch => axios.post('/documents', document).then((res) => {
    console.log(res.data);
  });
}

// create action for error handling
export function loadDocuments() {
  return dispatch => axios.get('/documents', {
    headers: {
      'x-access-token': localStorage.getItem('JWT') } }).then((res) => {
        console.log('hello', res);
        dispatch(loadDocsSuccess(res.data));
      });
}

export function getDoc(id) {
  return {
    type: types.GET_DOCUMENT,
    id
  };
}

// loadDocument action
// after getting doc
//    dispatch(loadDocumentSuccess(doc))


//    loadDocumentSuccess(doc){
//   retrun {type: document}
// }
