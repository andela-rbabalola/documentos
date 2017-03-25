import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
    axios.defaults.headers.common.Authorization = token;
  }
}
