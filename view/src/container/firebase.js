import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5hbUa3NHgTudMTX4v0Fl0DymrMkl6_NY",
    authDomain: "weekend-of-workshops-fall-2020.firebaseapp.com",
    databaseURL: "https://weekend-of-workshops-fall-2020.firebaseio.com",
    projectId: "weekend-of-workshops-fall-2020",
    storageBucket: "weekend-of-workshops-fall-2020.appspot.com",
    messagingSenderId: "1085057214780",
    appId: "1:1085057214780:web:ac29cf501dcb34053ed639",
    measurementId: "G-XYPZJYK8FX"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
