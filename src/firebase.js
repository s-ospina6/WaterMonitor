import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGET3teQUVjA_KBt9vtnZyFEKOn8QyN_c",
  authDomain: "watermonitor-500ad.firebaseapp.com",
  databaseURL: "https://watermonitor-500ad-default-rtdb.firebaseio.com",
  projectId: "watermonitor-500ad",
  storageBucket: "watermonitor-500ad.firebasestorage.app",
  messagingSenderId: "459102760341",
  appId: "1:459102760341:web:bfee5d6a67f365c3285a9c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };