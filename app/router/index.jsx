import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase';

// This is react-router middlware
// so this function is get call with very specific arguments
// 'replace' allow us to switch/redirect url
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

var ifLogin = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={ifLogin} />
    </Route>
  </Router>
);
