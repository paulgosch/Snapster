// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyB8rss6dHvYqStrfas-W7xDsUdrpa5LXj4",

  authDomain: "paulsnap-e35f6.firebaseapp.com",

  projectId: "paulsnap-e35f6",

  storageBucket: "paulsnap-e35f6.appspot.com",

  messagingSenderId: "490943528704",

  appId: "1:490943528704:web:198338b142c81926a17de5",

  databaseURL: "https://paulsnap-e35f6-default-rtdb.europe-west1.firebasedatabase.app"

};


// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const storage = getStorage();
/* export const FIREBASE_STORAGE = ref(storage);
export const FIREBASE_STORAGE_IMAGES = ref(storage, 'images/test.jpg'); */
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const db = getDatabase();
const userId = "alovelace"
export const reference = ref(db, "users/" + userId + "/");

/* set(reference, {
  username:"ufuka",
  email:"email@m.com",
}) */