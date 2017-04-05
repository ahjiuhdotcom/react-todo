import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyDz2k1yUiu72asZGXWS7GLnT4azKI6YH08",
      authDomain: "sia-todo-app.firebaseapp.com",
      databaseURL: "https://sia-todo-app.firebaseio.com",
      projectId: "sia-todo-app",
      storageBucket: "sia-todo-app.appspot.com",
      messagingSenderId: "274527988029"
    };

  firebase.initializeApp(config);

} catch (err) {

}

export var firebaseRef = firebase.database().ref();

// the reason to export default firebase (root firebase library) is that
// whatever file import firebase, they only need to import
// the specific firebase config file, not the entire module of firebase library
export default firebase;
