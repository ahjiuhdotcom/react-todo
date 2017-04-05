var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

// there is no 'export default' in 'actions'
// so, supposely we need to use import {a, b, c, etc} from 'actions'
// import * as actions is simplified where we grab all the property
// and put it in action variable
// then we can use 'actions.a' later
import * as actions from 'actions';
// WHEN REDUX IS USED
// var AddTodo = require('AddTodo');
var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
      expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text', () => {
    var todoText = 'Check mail';
    var action = actions.startAddTodo(todoText);

    var spy = expect.createSpy();

    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoText;

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO when invalid todo text', () => {
    var todoText = '';
    var spy = expect.createSpy();

    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoText;

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled(todoText);
  });
});
