// var redux = require('redux');
// use '* as redux' is grab all properties and put it in 'redux'
// since redux does not have default import
import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, todosReducers} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducers
  });

  // redux.compose is for redux devtool in chrome
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ?  window.devToolsExtension(): f => f
  ));

  return store;
}
