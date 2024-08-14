// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';  // Import the necessary auth functions
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PID,
  storageBucket: process.env.REACT_APP_FB_SB,
  messagingSenderId: process.env.REACT_APP_FB_MSID,
  appId: process.env.REACT_APP_FB_AID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the additional functions for authentication
export { onAuthStateChanged, signOut };
