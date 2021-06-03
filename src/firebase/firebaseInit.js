import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQa1glqJ_jztiDwJvgtcms8Xpkc1Kvvm4",
    authDomain: "testingstuff-7db9d.firebaseapp.com",
    databaseURL: "https://testingstuff-7db9d.firebaseio.com",
    projectId: "testingstuff-7db9d",
    storageBucket: "testingstuff-7db9d.appspot.com",
    messagingSenderId: "830255924524",
    appId: "1:830255924524:web:76f9cb22698fad6ac79889",
    measurementId: "G-CRWXVM4E78"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export function addTask(dataObject) {
    db.collection('tasks').add(dataObject);
}
