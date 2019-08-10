import app from 'firebase/app';
import 'firebase/auth';

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