/* eslint-disable import/default*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/homePage';
import AboutPage from './components/about/aboutPage';
import SignUpFormComponent from './components/signup/SignUp';
import DashBoardComponent from './components/dashboard/DashBoard';
import ManagementTabs from './components/management/tabs';
import requireAuth from './utils/ensureLoggedIn';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="signup" component={SignUpFormComponent} />
    <Route path="rolesPage" component={requireAuth(ManagementTabs)} />
    <Route path="dashboard" component={requireAuth(DashBoardComponent)} />
  </Route>
);
