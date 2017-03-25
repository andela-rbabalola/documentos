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
  return (dispatch) => {
    return axios.post('/documents', document).then((res) => {
      console.log(res.data);
    });
  };
}

// create action for error handling
export function loadDocuments() {
  return (dispatch) => {
    return axios.get('/documents').then((res) => {
      console.log('hello', res);
      dispatch(loadDocsSuccess(res.data));
    });
  };
}

// loadDocument action
// after getting doc
//    dispatch(loadDocumentSuccess(doc))


//    loadDocumentSuccess(doc){
//   retrun {type: document}
// }
