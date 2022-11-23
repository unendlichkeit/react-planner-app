import * as firebase from 'firebase/app';
import * as authOptions from 'firebase/auth';
import * as dbOptions from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';


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
    let userIdDocPath = dbOptions.doc(db, 'tasks', dataObject.owner); 
    return dbOptions.addDoc(dbOptions.collection(userIdDocPath, `${dataObject.dayTimestamp}`), dataObject);   //folosit variabila in template string ca sa transforme valoarea in string 
}

export async function retrieveTask(docTimestamp, currentUserId) {
    let collectionRef = dbOptions.collection(db, 'tasks', currentUserId, `${docTimestamp}`);
    const docsSnapshot = await dbOptions.getDocs(collectionRef);
    // console.log(docsSnapshot.docs[0].data());
    
        return docsSnapshot;
    
    // return await dbOptions.getDoc( docRef );
}

export async function deleteTask(docTimestamp, currentUserId, docId) {
    //document reference is sort of a path to the document
    const docRef = dbOptions.doc(db, 'tasks', currentUserId, `${docTimestamp}`, docId);
    return await dbOptions.deleteDoc(docRef);
}