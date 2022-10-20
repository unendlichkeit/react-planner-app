import * as firebase from 'firebase/app';
import * as authOptions from 'firebase/auth';
import * as dbOptions from 'firebase/firestore';


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
const app = firebase.initializeApp(firebaseConfig);

// export const db = firebase.firestore();
// export const auth = firebase.auth();
export const db = dbOptions.getFirestore(app);
export const auth = authOptions.getAuth(app);
export default firebase;

export async function addTask(dataObject) {
    //seteaza timestamp-ul ca id pt fiecare document ca sa poata fi identitificat dupa timestamp cand se face retragerea datelor din DB
    let docRef = await dbOptions.setDoc(dbOptions.doc(db, 'tasks', `${dataObject.dayTimestamp}`), dataObject);
    // console.log(docRef);
}

export async function retrieveTask(docTimestamp) {
    // console.log(dbOptions.collection(db, 'tasks'));
    // console.log(dbOptions.doc(db, 'tasks', `${docTimestamp}`));
    let docRef = dbOptions.doc(db, 'tasks', `${docTimestamp}`);

    return await dbOptions.getDoc( docRef );
}

