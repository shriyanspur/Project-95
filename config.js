import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBuE_beVmrooUj2emTYcoPSoNgvblEZH_c",
  authDomain: "blood-share-fd06e.firebaseapp.com",
  projectId: "blood-share-fd06e",
  storageBucket: "blood-share-fd06e.appspot.com",
  messagingSenderId: "16274893988",
  appId: "1:16274893988:web:fa0a239f667709ed4c0a31",
  measurementId: "G-9PNP4WVG7F"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();