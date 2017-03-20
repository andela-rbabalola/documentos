/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
