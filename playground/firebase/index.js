import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDz2k1yUiu72asZGXWS7GLnT4azKI6YH08",
    authDomain: "sia-todo-app.firebaseapp.com",
    databaseURL: "https://sia-todo-app.firebaseio.com",
    projectId: "sia-todo-app",
    storageBucket: "sia-todo-app.appspot.com",
    messagingSenderId: "274527988029"
  };

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

// -------------------
// TO CREATE
// -------------------
firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Sia',
    age: 35
  }
});

// -------------------
// TO UPDATE
// -------------------
// firebaseRef.update({
//   isRunning: false,
//   'app/name': 'Todo Application',
//   'user/name': 'Hua Jiuh'
// });

// alternative:
firebaseRef.child('app').update({name: 'Todo Application'});
firebaseRef.child('user').update({name: 'Hua Jiuh'});

// -------------------
// TO DELETE/REMOVE
// -------------------
// firebaseRef.child('app/name').remove();
//
// set 'null' can remove the data as well
// firebaseRef.child('app').update({
//   version: '2.0',
//   name: null
// });

// -------------------
// TO FETCH/READ
// -------------------
firebaseRef.once('value').then((snapshot) => {
  console.log('Got entire database', snapshot.key, snapshot.val());
}, (e) => {
  console.log('Unable to fetch value', e)
});

// as 'on' listener run continuously,
// it can't add promise,
// it should attached with callback
// promise: the first time the event occurs then the promise will be resolved
// and then when it occurs second time and since the promise has already be resolved
// so it will not occur again.
// firebaseRef.on('value', (snapshot) => {
//   console.log('Got value', snapshot.val());
// });

// remove listener for entirely
// firebaseRef.off();

// // remove listener for specific listener
// var logData = (snapshot) => {
//   console.log('Got data', snapshot.val());
// }
//
// firebaseRef.on('value', logData);
// firebaseRef.off('value', logData);

// // listen to specific child
// firebaseRef.child('user').on('value', (snapshot) => {
//   console.log('User ref changed', snapshot.val());
// });
//
// firebaseRef.child('user').update({name: 'Mike'});
// firebaseRef.child('app').update({name: 'Something else'});

// -------------------
// WORKING WITH ARRAY
// -------------------
var notesRef = firebaseRef.child('notes');

notesRef.on('child_added', (snapshot) => {
  console.log('Child_added', snapshot.key, snapshot.val());
});

notesRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val());
});

notesRef.on('child_removed', (snapshot) => {
  console.log('Child_removed', snapshot.key, snapshot.val());
});

// var newNoteRef = notesRef.push();
// newNoteRef.set({
//   text: 'Walk the dog'
// });
var newNoteRef = notesRef.push({
  text: 'Walk the dog!'
});
console.log('Todo id', newNoteRef.key);
