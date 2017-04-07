var $ = require('jquery');

// we can run localStorage.setItem(), localStorage.getItem()
// in the console of the browser
// to remove the file in localStorage, run localStorage.removeItem('todos');

module.exports = {
  // WHEN FIREBASE IS USED
  // setTodos: function(todos) {
  //
  //     if($.isArray(todos)) {
  //       // localStorage is browser built in storge (no need to install)
  //       // localStorage take key value pair
  //       // setItem: 1st argument is the name (key),
  //       // 2nd argument is the data to pass in, in string format (value)
  //       localStorage.setItem('todos', JSON.stringify(todos));
  //       return todos;
  //     }
  //
  //     // We dont do anything if todos is not array
  // },
  // getTodos: function() {
  //   var stringTodos = localStorage.getItem('todos');
  //   var todos = [];
  //
  //   // require this because stringTodos might be undefined
  //   // (e.g. it is not an array and was not save in localStorage)
  //   // which can't be parsed
  //   try {
  //     todos = JSON.parse(stringTodos);
  //   } catch (error) {
  //
  //   }
  //
  //   // todos might be object too (in certain case)
  //   // if($.isArray(todos)) {
  //   //   return todos;
  //   // } else {
  //   //   return [];
  //   // }
  //   // Using ternary operator
  //   return $.isArray(todos) ? todos : [];
  // },
  filterTodos: function(todos, showCompleted, searchText) {
    console.log('1');
    var filteredTodos = todos;
    console.log('2');
    console.log('filteredTodos', filteredTodos);

    // filter by showCompleted
    // '.filter' is built in array method
    filteredTodos = filteredTodos.filter((todo) => {
      // only show item that 'completed' property is false
      // or the 'showCompleted' is true (checked)
      return !todo.completed || showCompleted;
    });
    console.log('3');
    // filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();

      // if '.indexOf' return -1 means the text is not found
      return searchText.length == 0 || text.indexOf(searchText) > -1;
    });
    console.log('4');
    // Sort todos with non-completed first
    // '.sort' is built in array method, pass in 2 argument, e.g. a, b
    // if return '-1', 'a' should be before 'b'
    // if return '1', 'a' should be after 'b'
    // if return '0', no change (a & b are equal)
    // There is problem with the sorting due 'filteredTodos' is never update to state (setState) at any point in this project
    // So, every sorting always start according to the arrangement in the saved state, not last sorted arrangement
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }

};
