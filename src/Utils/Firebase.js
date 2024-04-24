// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhRfK-DdrzgkRUCvrENY4R1ZeDGPA9djM",
  authDomain: "netflixgpt-40b9d.firebaseapp.com",
  projectId: "netflixgpt-40b9d",
  storageBucket: "netflixgpt-40b9d.appspot.com",
  messagingSenderId: "962477298430",
  appId: "1:962477298430:web:2e23aaf78ba98a847b0baf",
  measurementId: "G-9L1JG1QZYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();