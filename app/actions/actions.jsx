import moment from 'moment';

// no need to specifying 'app/firebase/index' because
// the unique name of 'index.js'
import firebase, {firebaseRef} from 'app/firebase';

// REFER TO LEARN REDUX TO GET EXPLANATION ON REDUX THUNK

export var setSearchText = (searchText) => {
  return {
      type: 'SET_SEARCH_TEXT',
      searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
}

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

// export var toggleTodo = (id) => {
export var updateTodo = (id, updates) => {
  return {
      // type: 'TOGGLE_TODO',
      type: 'UPDATE_TODO',
      id,
      updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  }
}
