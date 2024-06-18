// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN2DNVK9DB1irsxIwt4KceHjD0F0wmv2g",
  authDomain: "pulseai-354b6.firebaseapp.com",
  projectId: "pulseai-354b6",
  storageBucket: "pulseai-354b6.appspot.com",
  messagingSenderId: "430968379184",
  appId: "1:430968379184:web:ed62dc39fb4236d9609af5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db= getFirestore(app)