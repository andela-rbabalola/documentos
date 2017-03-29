/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore.dev';
import { reauthenticate } from './actions/userActions';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';
import '../../node_modules/material-icons/css/material-icons.css';
import './styles/styles.css';

const store = configureStore();
console.log('store', store.getState());
console.log('local', typeof localStorage.getItem('isAuthenticated'));
if ((localStorage.getItem('isAuthenticated')) === 'true') {
  // dispatch action here
  // state.user.isAuthenticated = true;
  console.log('I got here');
  store.dispatch(reauthenticate());
}

render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
