import moment from 'moment';

// no need to specifying 'app/firebase/index' because
// the unique name of 'index.js'
import firebase, {firebaseRef, githubProvider} from 'app/firebase';

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

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child('todos');

    return todoRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parseTodos = [];

      // todos is an object, but we need array of an object
      // when we dispatch 'addTodos'
      // Object.keys will produce a array of object key
      // from an object
      Object.keys(todos).forEach((todoId) => {
        // ...todos[todoId] means add everything from todos[todoId]
        // to this object
        parseTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parseTodos));
    });
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

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out');
    });
  };
};
