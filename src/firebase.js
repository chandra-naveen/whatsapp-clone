import firebase from 'firebase/compat/app'
import  'firebase/compat/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCexf4j1wGzWDKL1GpsD7-UkSLkMeytvlY",
    authDomain: "whatsapp-firebase-ef902.firebaseapp.com",
    projectId: "whatsapp-firebase-ef902",
    storageBucket: "whatsapp-firebase-ef902.appspot.com",
    messagingSenderId: "449283814211",
    appId: "1:449283814211:web:4f95ad43c5b1b50d43b5f6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db;
