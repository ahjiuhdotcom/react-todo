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
});
