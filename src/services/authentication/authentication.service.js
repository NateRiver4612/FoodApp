import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC98jYLBBu7-do4qI08S7_dINPjTJ67Q_8",
  authDomain: "meal-to-go-39583.firebaseapp.com",
  projectId: "meal-to-go-39583",
  storageBucket: "meal-to-go-39583.appspot.com",
  messagingSenderId: "1097000483853",
  appId: "1:1097000483853:web:7cb7c1eed1b2b05b7c6944",
  measurementId: "G-061224NXQJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseSignIn = async (email, password) =>
  await firebase.auth().signInWithEmailAndPassword(email, password);

export const firebaseSignUp = async (email, password) =>
  await firebase.auth().createUserWithEmailAndPassword(email, password);

export const firebaseLogOut = async () => await firebase.auth().signOut();

export const firebaseAuthChange = async (callback) =>
  firebase.auth().onAuthStateChanged(callback);
