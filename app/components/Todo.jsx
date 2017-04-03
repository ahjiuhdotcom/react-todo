var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

// putting keyword 'export' just for testing purpose
export var Todo = React.createClass({
  render: function() {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    }

    return (
      <div className={todoClassName} onClick={()=>{
          // this.props.onToggle(id);
          dispatch(actions.toggleTodo(id));
        }}>
        <div>
          <input type="checkbox" checked={completed} />
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
});

// WHEN REDUX IS USED
// module.exports = Todo;
// No need to put anything in first argument (no nd to grab anything from the state)
// Because props for Todo get passed down from TodoList
// module.exports = connect()(Todo);

// WHEN WANT TO TEST PROPERLY WITH REDUX IN PLACE
// In order for test to run properly, we need to export
// 1. the original component (react class), so that we can test it easily without call the store & provider)
// by putting 'export' keywords before the component var, e.g. 'export var Todo'
// 2. the connectified component (connect()(Todo))
// connect()(Todo) component require store to exist
// 'export default' enable us to export everything which including
// 'export var Todo' even though already export the var
// So that the code doesn't break because of 'export var Todo'
export default connect()(Todo);
