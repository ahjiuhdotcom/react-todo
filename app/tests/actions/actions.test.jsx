// mock-store is a fake store used for testing puprose
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var expect = require('expect');
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {

    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };

    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {

    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {

    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0
      }
    };

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  // putting argument 'done' let mocha know that we have async test
  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My todo item';

    // call catch(done) will simply stop the test if something goes wrong and with error object
    // if use other argument, it will assume test fail and print error message to the screen
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      // based on flow of 'startAddTodo' in actions.jsx
      // we expect 'addTodos' action is successfully dispatch here

      // 'getActions' return an array of all the action
      // that is fired in the mock store
      // In this case, only 'addTodo' is dispatch after successfully push to firebaseRef
      const actions = store.getActions();

      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();

    }).catch(done);
  });

  it('should generate add todos action object', () => {
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

    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {

    var action = {
      type: 'TOGGLE_TODO',
      id: '123'
    };

    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });
});
