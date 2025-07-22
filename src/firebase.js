// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ_-fX6_Sa5kwCucf4HltcPCD96phMsEE",
  authDomain: "fitzen-x.firebaseapp.com",
  projectId: "fitzen-x",
  storageBucket: "fitzen-x.firebasestorage.app",
  messagingSenderId: "40879842037",
  appId: "1:40879842037:web:75906b7422bdf65d351bbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);