var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todosReducers} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducers
  });

  // redux.compose is for redux devtool in chrome
  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ?  window.devToolsExtension(): f => f
  ));

  return store;
}
