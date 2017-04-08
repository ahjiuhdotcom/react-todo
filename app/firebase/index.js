import firebase from 'firebase';

// For security purpose, we better put the config file in seperate file
// e.g. config/test.env and config/development.env
// these is custom environment variables
// we create two more config because we want to work with different database
// according to our environment, e.g. test env, dev env or production env
try {
  var config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET
    };

  firebase.initializeApp(config);

} catch (err) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();

export var firebaseRef = firebase.database().ref();

// the reason to export default firebase (root firebase library) is that
// whatever file import firebase, they only need to import
// the specific firebase config file, not the entire module of firebase library
export default firebase;
