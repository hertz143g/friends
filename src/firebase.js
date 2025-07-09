// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBan2jySS6E4euGDi0v85Hrr3gZDyexhk",
  authDomain: "friendsstore-ebc1d.firebaseapp.com",
  projectId: "friendsstore-ebc1d",
  storageBucket: "friendsstore-ebc1d.firebasestorage.app",
  messagingSenderId: "268389293019",
  appId: "1:268389293019:web:023da8fbb6dc34f8b8a5fe",
  measurementId: "G-31774XTPJS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
