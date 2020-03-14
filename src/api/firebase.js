import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDvnKIOG40-Fhbpr_6I4oeYKt2J6F-oqJU",
    authDomain: "lap2-270b6.firebaseapp.com",
    databaseURL: "https://lap2-270b6.firebaseio.com",
    projectId: "lap2-270b6",
    storageBucket: "lap2-270b6.appspot.com",
    messagingSenderId: "934866289582"
};
  
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : null;

export default firebase;