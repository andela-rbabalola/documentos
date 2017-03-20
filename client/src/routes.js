/* eslint-disable import/default*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App'; // does not exist yet
import AdminPage from './components/admin/adminPage'; // does not exist yet
import HomePage from './components/home/homePage'; // does not exist yet

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="admin" component={AdminPage} />
  </Route>
);
