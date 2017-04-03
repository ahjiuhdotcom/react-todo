var React = require('react');
// To connect to the store thru provider
var {connect} = require('react-redux');

// var Todo = require('Todo');
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
  render: function() {

    var {todos, showCompleted, searchText} = this.props;

    var renderTodos = () => {
      if (todos.length === 0) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }

      // return todos.map((todo) => {
      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
        // {...todo} is using spread operator
        // it spread out all the property in the object
        // In this case it spread out the todo object into individual props
        // so that all attributes in todo is passed down tp child
        return (
          // <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
          <Todo key={todo.id} {...todo} />
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

// WHEN REDUX IS USED
// module.exports = TodoList;
// connect to state thru store to get the 'todos' array
// and make a props call 'todos', equal state.todos in it
// we could return the entire state, but best grab only those we need
// 'state' is the only argument to passed in to the function
// and will be called by redux thru connect
// module.exports = connect(
//   (state) => {
//     return {
//       todos: state.todos
//     };
//   }
// )(TodoList);

// refer to Todo.jsx why export default is used
export default connect(
  (state) => {
    return state;
  }
)(TodoList);
