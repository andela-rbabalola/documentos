/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import axios from 'axios';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore.dev';
import { reauthenticate } from './actions/userActions';
import setAuthorizationToken from './utils/setAuthorization';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';
import '../../node_modules/material-icons/css/material-icons.css';
import '../../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();
if ((localStorage.getItem('isAuthenticated')) === 'true') {
  // If the user is already authenticated, dispatch this action
  if ((localStorage.getItem('SuperAdmin')) === 'true') {
    const isSuperAdmin = true;
    store.dispatch(reauthenticate(isSuperAdmin));
  } else {
    store.dispatch(reauthenticate());
    setAuthorizationToken(localStorage.getItem('JWT'));
    axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
  }
}

render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
