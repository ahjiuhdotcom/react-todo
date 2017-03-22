var React = require('react');
var ReactDOM = require('react-dom');
// var Route = require('react-router').Route
var { Route, Router, IndexRoute, hashHistory } = require('react-router');


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
  <p>Boilerplate 3 Project</p>
  document.getElementById('app') // Where to render
);
