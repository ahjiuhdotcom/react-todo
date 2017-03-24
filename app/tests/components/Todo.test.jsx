var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
      expect(Todo).toExist();
  });

  it('should call onToggle prop with id on click', () => {
    var todoData = {
      id: 199,
      text: 'Write todo.test.jsx test',
      completed: true
    };

    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy} />);

    var $el = $(ReactDOM.findDOMNode(todo));

    // if we select form, we can put '$el.find('form')[0]'
    // but for 'div' or other tagName, just put root element directly e.g. '$el[0]'
    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(todoData.id);
  });
});
