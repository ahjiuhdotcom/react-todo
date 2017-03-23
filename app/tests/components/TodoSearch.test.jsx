var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
  it('should exist', () => {
      expect(TodoSearch).toExist();
  });

  it('should call onSearch with entered input text', () => {
    var searchText = 'Dog';
    var spy = expect.createSpy();

    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

    // We previously used $el.find to target the form and simulate a submit action.
    // We don't need to do that here since we have refs defined on our input fields.
    // The refs point directly do the DOM nodes we want to simulate events on.
    // That means .find() is not necessary.

    // Does that mean that if we added a ref to the form directly in the previous project, we could have referenced it directly too?
    // We use jQuery in the tests to allow for more flexible querying of the components DOM.
    // We can 100% remove jQuery and use refs, but it is annoying to create all these refs that were only going to be used by test file
    // Details can refer to Q&A in lecture 92 'Testing the filtered component'

    // var $el = $(ReactDOM.findDOMNode(todoSearch));

    todoSearch.refs.searchText.value = searchText;

    TestUtils.Simulate.change(todoSearch.refs.searchText);

    expect(spy).toHaveBeenCalledWith(false, 'Dog');
  });

  it('should call onSearch with entered checked value', () => {
    var spy = expect.createSpy();

    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

    todoSearch.refs.showCompleted.checked = true;

    TestUtils.Simulate.change(todoSearch.refs.showCompleted);

    expect(spy).toHaveBeenCalledWith(true, '');
  });
});
