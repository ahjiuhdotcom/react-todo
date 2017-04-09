var expect = require('expect');

// use to freeze the state of reducer so that it check
// wheather reducer is maintain behavior of pure function
// (structure of parameter or property of object
// that was passed in was not mutated in reducer)
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducer', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };

      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todosReducers', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc123',
          text: 'Walk the dog',
          completed: false,
          createdAt: 92384275
        }
      };

      var res = reducers.todosReducers(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should update todo', () => {
      var todos = [{
        id: '123',
        text: 'Somthing',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }];

      var updates = {
        completed: false,
        completedAt: null
      };

      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };

      var res = reducers.todosReducers(df(todos), df(action))

      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    });

    it('should add existing todos', () => {

      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];

      var action = {
        type: 'ADD_TODOS',
        todos
      };

      var res = reducers.todosReducers(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);

    });

    it('should wipe todos on logout', () => {

      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];

      var action = {
        type: 'LOGOUT',
        todos
      };

      var res = reducers.todosReducers(df([todos]), df(action));

      expect(res.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      const action = {
        type: 'LOGIN',
        uid: 'abc123'
      };
      // if state value set to 'undefined' means we are using default value
      const res = reducers.authReducer(undefined, df(action));

      expect(res).toEqual({
        uid: action.uid
      })
    });

    it('should wipe auth on LOGOUT', () => {
      const authData = {
        uid: '123abc'
      };
      const action = {
        type: 'LOGOUT'
      };
      const res = reducers.authReducer(df(authData), df(action));

      expect(res).toEqual({});
    });
  });
});
