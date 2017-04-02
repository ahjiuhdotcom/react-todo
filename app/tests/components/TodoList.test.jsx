var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
      expect(TodoList).toExist();
  });

  it('should render one Todo component for each todos item',  () => {
    var todos = [
      {
        id: 1,
        text: 'Do something'
      },
      {
        id: 2,
        text: 'Check mail'
      },
    ];

    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

    // scryRenderedComponentsWithType method let us check how many given component
    // are get rendered under seperate component
    // In this case check how many Todo component are rendered under TodoList component
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    expect(todoComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos',  () => {
    var todos = [];

    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

    var $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
