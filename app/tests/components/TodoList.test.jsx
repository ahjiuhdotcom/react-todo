var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import {configure} from 'configureStore';
// var TodoList = require('TodoList');
import ConnectedTodoList, {TodoList} from 'TodoList';
// var Todo = require('Todo');
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
      expect(TodoList).toExist();
  });

  it('should render one Todo component for each todos item',  () => {
    var todos = [
      {
        id: 1,
        text: 'Do something',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      },
      {
        id: 2,
        text: 'Check mail',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      },
    ];
    var store = configure({
      todos
    });

    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    )
    // var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];

    // scryRenderedComponentsWithType method searches for all instances of the provided React Component.
    // In this case instances of todoList (which is Todo component) are get rendered
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todoComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos',  () => {
    var todos = [];

    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

    var $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
