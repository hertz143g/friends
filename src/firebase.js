// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBan2jySS6E4euGDi0v85Hrr3gZDyexhk",
  authDomain: "friendsstore-ebc1d.firebaseapp.com",
  projectId: "friendsstore-ebc1d",
  storageBucket: "friendsstore-ebc1d.firebasestorage.app",
  messagingSenderId: "268389293019",
  appId: "1:268389293019:web:023da8fbb6dc34f8b8a5fe",
  measurementId: "G-31774XTPJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);