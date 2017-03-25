import axios from 'axios';
import * as types from './actionTypes';

export function setDocument(document) {
  return {
    type: types.CREATE_DOC_SUCCESS,
    document
  };
}

export function createDocument(document) {
  return (dispatch) => {
    return axios.post('/documents', document).then((res) => {
      console.log(res.data);
    });
  };
}
