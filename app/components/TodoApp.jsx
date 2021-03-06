// var React = require('react');
import React from 'react';
import * as Redux from 'react-redux';

// var uuid = require('node-uuid');
// var moment = require('moment');

// var TodoList = require('TodoList');
import TodoList from 'TodoList';

// var AddTodo = require('AddTodo');
import AddTodo from 'AddTodo';
// var TodoSearch = require('TodoSearch');
import TodoSearch from 'TodoSearch';
// var TodoAPI = require('TodoAPI');

import * as actions from 'actions';

export var TodoApp = React.createClass({
  // WHEN REDUX IS USED
  // getInitialState: function() {
  //   return {
  //     showCompleted: false,
  //     searchText: '',
  //     todos: TodoAPI.getTodos()
  //   };
  // },
  // componentDidUpdate: function() {
  //   TodoAPI.setTodos(this.state.todos);
  // },
  // handleAddTodo: function (text) {
  //   this.setState({
  //     // spread operator: '...this.state.todos' is spreading out
  //     // all item (todos state) in the array and put it into the new array
  //     todos: [
  //       ...this.state.todos,
  //       {
  //         id: uuid(),
  //         text: text,
  //         completed: false,
  //         createdAt: moment().unix(),
  //         completedAt: undefined
  //       }
  //     ]
  //   });
  // },
  // handleToggle: function(id) {
  //
  //   var updatedTodos = this.state.todos.map((todo) => {
  //     if(todo.id === id) {
  //       todo.completed = !todo.completed;
  //       todo.completedAt = todo.completed ? moment().unix() : undefined;
  //     }
  //     return todo
  //   });
  //
  //   this.setState({todos: updatedTodos});
  // },
  // handleSearch: function(showCompleted, searchText){
  //   this.setState({
  //     showCompleted: showCompleted,
  //     searchText: searchText.toLowerCase()
  //   });
  // },
  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  },
  render: function() {
    // var { todos, showCompleted, searchText } = this.state;
    // var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>

        <h1 className="page-title">Todo App</h1>
          <div className="row">
            <div className="column small-centered small-11 medium-6 large-5">
              <div className="container">
                {/*
                  <TodoSearch onSearch={this.handleSearch} />
                  <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
                  <AddTodo onAddTodo={this.handleAddTodo}/>
                  All component able to access all the require props thru the store
                */}
                <TodoSearch />
                <TodoList />
                <AddTodo />
              </div>
            </div>
          </div>
      </div>
    );
  }
});

// module.exports = TodoApp;
export default Redux.connect()(TodoApp);
