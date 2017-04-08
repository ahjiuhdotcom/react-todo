var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};

export var todosReducers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];

    // case 'TOGGLE_TODO':
    case 'UPDATE_TODO':

      return state.map((todo) => {
        if(todo.id === action.id) {
          // All DONE IN ACTION
          // var nextCompleted = !todo.completed;
          // return {
          //   ...todo,
          //   completed: nextCompleted,
          //   completedAt: nextCompleted ? moment().unix() : undefined
          // }

          // 2 spread operator (one after another):
          // the second one will overrite the first one for matched properties
          // the rest of the properties still remain
          return {
            ...todo,
            ...action.updates
          }
        } else {
          return todo;
        }
      });

    case 'ADD_TODOS':

      // '...action.todos' maybe none or maybe many.
      // that's why spread operator required
      return [
        ...state,
        ...action.todos
      ];

    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  }
}
