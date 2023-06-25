// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGjkFp3HE3QhJEaG2mx7Qg0nLyTqKQFBE",
  authDomain: "socialtest-cef88.firebaseapp.com",
  projectId: "socialtest-cef88",
  storageBucket: "socialtest-cef88.appspot.com",
  messagingSenderId: "432862222470",
  appId: "1:432862222470:web:bbeb49781c30309f371907",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const storage = getStorage(app);
export const auth = getAuth(app);
