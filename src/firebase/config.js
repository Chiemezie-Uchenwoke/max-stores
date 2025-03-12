// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyC34NMftuETJuU7dgTHaoxnM1UYai8Ap20",
  authDomain: "max-stores.firebaseapp.com",
  projectId: "max-stores",
  storageBucket: "max-stores.firebasestorage.app",
  messagingSenderId: "83980172475",
  appId: "1:83980172475:web:6c8899f02c2a0f25e23d9e",
  measurementId: "G-70XTZQ6M4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth};