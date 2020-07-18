import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/analytics';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD_KO9xRZpSRipyZj7StjYcSdGm9kNQ_24",
  authDomain: "gutta-xyz.firebaseapp.com",
  databaseURL: "https://gutta-xyz.firebaseio.com",
  projectId: "gutta-xyz",
  storageBucket: "gutta-xyz.appspot.com",
  messagingSenderId: "316381608569",
  appId: "1:316381608569:web:5187a244ac074195ba72a8",
  measurementId: "G-DETGMZRBLP"
});

const analytics = firebaseApp.analytics();
const storage = firebaseApp.storage();
const auth = firebaseApp.auth();
const functions = firebaseApp.functions('europe-west3');
const db = firebaseApp.database();

export { db, storage, auth, functions, analytics };
