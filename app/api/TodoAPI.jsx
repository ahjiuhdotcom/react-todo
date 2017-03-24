var $ = require('jquery');

// we can run localStorage.setItem(), localStorage.getItem()
// in the console of the browser to check if required

module.exports = {
  setTodos: function(todos) {

      if($.isArray(todos)) {
        // localStorage is browser built in storge (no need to install)
        // localStorage take key value pair
        // setItem: 1st argument is the name (key),
        // 2nd argument is the data to pass in, in string format (value)
        localStorage.setItem('todos', JSON.stringify(todos));
        return todos;
      }

      // We dont do anything if todos is not array
  },
  getTodos: function() {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    // require this because stringTodos might be undefined
    // (e.g. it is not an array and was not save in localStorage)
    // which can't be parsed
    try {
      todos = JSON.parse(stringTodos);
    } catch (error) {

    }

    // todos might be object too (in certain case)
    // if($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // }
    // Using ternary operator
    return $.isArray(todos) ? todos : [];
  }
};
