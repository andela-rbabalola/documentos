/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/material-icons/css/material-icons.css';
import './styles/styles.css';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
