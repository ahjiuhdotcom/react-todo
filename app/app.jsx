var React = require('react');
var ReactDOM = require('react-dom');

// 'Provider' let us provide the store to the children component
// e.g. TodoList, even though rendered 2 component deep,
// can still access attribute on the store & use the to rendered
var {Provider} = require('react-redux');

// var Route = require('react-router').Route
// var { Route, Router, IndexRoute, hashHistory } = require('react-router');
var { hashHistory } = require('react-router');

// var TodoApp = require('TodoApp');
// import TodoApp from 'TodoApp';

var actions = require('actions');
var store = require('configureStore').configure();
// var TodoAPI = require('TodoAPI');
// import Login from 'Login';
import firebase from 'app/firebase/';
import router from 'app/router';

// upon change of user auth status e.g. login or logout
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

// import './../playground/firebase/index';

// WHEN FIREBASE IS USED
// store.subscribe(() => {
//   var state = store.getState();
//   console.log('New state', state);
//   TodoAPI.setTodos(state.todos);
// });


// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

// store.dispatch(actions.addTodo('Clean the yard'));
// store.dispatch(actions.setSearchText('yard'));
// store.dispatch(actions.toggleShowCompleted());

// Load css version of foundation
// 'css!' is css loader teach program how to load the file
// 'style!' is style loader use to inject the file into html so that the style actually show up
// require('style!css!foundation-sites/dist/foundation.min.css') // This is commented out because we load the foundation thru css

// use jquery to select the document and call the foundation method
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

// MOVE TO app/router/index.jsx
/*
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
*/

// What to render by react-dom
// document.getElementById('app') is the location to render the component
// hashHistory is store on the client,
// we don't want todo anything with the server with our router
ReactDOM.render(
  <Provider store={store}>
    {/*
      <TodoApp />
      */}
    {/*
    // MOVE TO app/router/index.jsx
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        <IndexRoute component={Login} onEnter={ifLogin} />
      </Route>
    </Router>
    */}
    {router}
  </Provider>,
  document.getElementById('app') // Where to render
);
