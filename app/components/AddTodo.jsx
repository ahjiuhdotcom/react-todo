var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    
    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      // WHEN REDUX IS USED
      // this.props.onAddTodo(todoText);
      dispatch(actions.addTodo(todoText));
    } else {
      // refocus the input field if validation on length failed
      // sp that they can try again
      this.refs.todoText.focus();
    }
  },
  render: function() {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
});

// WHEN REDUX IS USED
// module.exports = AddTodo;
export default connect()(AddTodo);
