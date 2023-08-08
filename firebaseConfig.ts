// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyB8rss6dHvYqStrfas-W7xDsUdrpa5LXj4",

  authDomain: "paulsnap-e35f6.firebaseapp.com",

  projectId: "paulsnap-e35f6",

  storageBucket: "paulsnap-e35f6.appspot.com",

  messagingSenderId: "490943528704",

  appId: "1:490943528704:web:198338b142c81926a17de5"

};


// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const storage = getStorage();
export const FIREBASE_STORAGE = ref(storage);
export const FIREBASE_STORAGE_IMAGES = ref(storage, 'images/test.jpg');
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);