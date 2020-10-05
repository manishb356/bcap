import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
import 'firebase/functions'

var firebaseConfig = {
  apiKey: "AIzaSyB2sL3M1YuE3u-fNCvixDB8QkRAyhu8Hg8",
  authDomain: "bcap-3e4af.firebaseapp.com",
  databaseURL: "https://bcap-3e4af.firebaseio.com",
  projectId: "bcap-3e4af",
  storageBucket: "bcap-3e4af.appspot.com",
  messagingSenderId: "1001334671621",
  appId: "1:1001334671621:web:76a9c4baa797c151260f6c",
  measurementId: "G-61SPSDQ6DY"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const fu = firebase.functions();
const st = firebase.storage();
export {
  fb,
  db,
  fu,
  st
}
// firebase.analytics();