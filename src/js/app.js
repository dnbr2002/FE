import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import {
  ChangePasswordPage, MasterPage, IndexPage, LoginPage, RegisterPage, ResetPasswordPage,
  VerifyEmailPage, ProfilePage, EventerPage, JumperPage, DressagePage, MyTeamsPage, HomePage, ListItem
} from './pages';

ReactStormpath.init();

ReactDOM.render(
  <Router history={browserHistory}>
    <HomeRoute path='/' component={MasterPage}>
      <IndexRoute component={IndexPage} />
      <LoginRoute path='/login' component={LoginPage} />
      <Route path='/verify' component={VerifyEmailPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/change' component={ChangePasswordPage} />
      <Route path='/forgot' component={ResetPasswordPage} />
      <AuthenticatedRoute>
        <HomeRoute path='/home' component={HomePage} />
      </AuthenticatedRoute>
      <AuthenticatedRoute>
        <Route path='/profile' component={ProfilePage} />
      </AuthenticatedRoute>
      <AuthenticatedRoute>
        <Route path='/eventerpage' component={EventerPage} />
      </AuthenticatedRoute>
      <AuthenticatedRoute>
        <Route path='/jumperpage' component={JumperPage} />
      </AuthenticatedRoute>
      <AuthenticatedRoute>
        <Route path='/dressagepage' component={DressagePage} />
      </AuthenticatedRoute>
      <AuthenticatedRoute>
        <Route path='/myteamspage' component={MyTeamsPage} />
      </AuthenticatedRoute>
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
);
if (module.hot) {
  module.hot.accept();
}