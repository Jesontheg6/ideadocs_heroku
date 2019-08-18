import 'firebase/auth';

import app from 'firebase/app';

import toast from '../../constants/toast';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMIAN,
    databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRE_APP_ID
  };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    // use firebase observer to set token to local state that we will use to
    // verify on the backend
    this.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        user.getIdToken(true).then(token => {
          // Save token for our backend
          sessionStorage.setItem('token', token);
        }).catch(err => toast('error', err.message));
      } else {
        // No user is signed in.
        sessionStorage.removeItem('token');
      }
    });
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
};

export default Firebase;