var React = require('react');
var ReactDOM = require('react-dom');

// 'Provider' let us provide the store to the children component
// e.g. TodoList, even though rendered 2 component deep,
// can still access attribute on the store & use the to rendered
var {Provider} = require('react-redux');

// var Route = require('react-router').Route
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
  console.log('New state', store.getState());
});

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

// What to render by react-dom
// document.getElementById('app') is the location to render the component
ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app') // Where to render
);
