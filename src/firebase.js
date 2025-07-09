// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Если нужно хранить файлы (картинки) в Firebase Storage:
import { getStorage } from "firebase/storage";
import { db } from "./firebase";


const firebaseConfig = {
  apiKey: "AIzaSyB8an2JyS6E4euGDi8v85Hrr3g2Dyexhk",
  authDomain: "friendstore-ebc1d.firebaseapp.com",
  projectId: "friendstore-ebc1d",
  storageBucket: "friendstore-ebc1d.appspot.com",
  messagingSenderId: "263889239019",
  appId: "1:263889239019:web:023da8fbb6dc34f8ba8a5e",
  measurementId: "G-31774XTPJS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);       // Это твоя база (Firestore)
export const storage = getStorage(app);    // Это хранилище файлов (Storage, если надо)
