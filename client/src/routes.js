/* eslint-disable import/default*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/homePage';
import AboutPage from './components/about/aboutPage';
import SignUpForm from './components/signup/SignUp';
import DashBoard from './components/dashboard/DashBoard';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="signup" component={SignUpForm} />
    <Route path="dashboard" component={DashBoard} />
  </Route>
);
