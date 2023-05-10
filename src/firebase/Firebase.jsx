// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ULveQYb3MMPgHOT2cKorBgalF_2AANY",
  authDomain: "arisanreact.firebaseapp.com",
  projectId: "arisanreact",
  storageBucket: "arisanreact.appspot.com",
  messagingSenderId: "117858391942",
  appId: "1:117858391942:web:c6dadb65f06ec55de4fe07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)