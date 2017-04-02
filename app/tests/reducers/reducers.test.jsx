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
        text: 'Walk the dog'
      };

      var res = reducers.todosReducers(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });

    it('should toggle todo', () => {
      var todos = [{
        id: '123',
        text: 'Somthing',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }];

      var action = {
        type: 'TOGGLE_TODO',
        id: '123'
      }

      var res = reducers.todosReducers(df(todos), df(action))

      expect(res[0].completed).toEqual(false);
      expect(res[0].completedAt).toEqual(undefined);
    });
  });
});
