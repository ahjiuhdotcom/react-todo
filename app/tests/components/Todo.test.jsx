var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import * as actions from 'actions';

// WHEN REDUX IS USED
// var Todo = require('Todo');
// var {Todo} = require('Todo');
import {Todo} from 'Todo';

describe('Todo', () => {
  it('should exist', () => {
      expect(Todo).toExist();
  });

  // WHEN REDUX IS USED
  // it('should call onToggle prop with id on click', () => {
  it('should dispatch TOGGLE_TODO action on click', () => {
    var todoData = {
      id: 199,
      text: 'Write todo.test.jsx test',
      completed: true
    };

    var action = actions.startToggleTodo(todoData.id, !todoData.completed);

    var spy = expect.createSpy();

    // WHEN REDUX IS USED
    // var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy} />);
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);

    var $el = $(ReactDOM.findDOMNode(todo));

    // if we select form, we can put '$el.find('form')[0]'
    // but for 'div' or other tagName, just put root element directly e.g. '$el[0]'
    TestUtils.Simulate.click($el[0]);

    // WHEN REDUX IS USED
    // expect(spy).toHaveBeenCalledWith(todoData.id);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
