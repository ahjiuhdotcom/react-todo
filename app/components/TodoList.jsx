var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function() {

    var {todos} = this.props;

    var renderTodos = () => {
      return todos.map((todo) => {
        // {...todo} is using spread operator
        // it spread out all the property in the object
        // In this case it spread out the todo object into individual props
        // so that all attributes in todo is passed down tp child
        return (
          <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

module.exports = TodoList;
