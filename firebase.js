import * as firebase from "firebase/compat/"
import "firebase/compat/firestore"
import "firebase/compat/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCjDkJs6l2vChp-NL9zzvAT1333bBqG0V8",
    authDomain: "signal-clone-efe4c.firebaseapp.com",
    projectId: "signal-clone-efe4c",
    storageBucket: "signal-clone-efe4c.appspot.com",
    messagingSenderId: "696114511068",
    appId: "1:696114511068:web:39144f01e5de8fb86c0819"
  };
let app;
if(firebase.apps.length === 0){
  app= firebase.initializeApp(firebaseConfig)
} else{
  app = firebase.app();
}

const db = app.firestore()
const auth = firebase.auth()

export {db, auth}