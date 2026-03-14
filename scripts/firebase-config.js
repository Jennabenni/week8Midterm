import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";



const firebaseConfig = {
   apiKey: "AIzaSyC0SNy6Ev0I8niE46neD2mudZC6orq3zbg",
  authDomain: "actonactivities.firebaseapp.com",
  projectId: "actonactivities",
  storageBucket: "actonactivities.firebasestorage.app",
  messagingSenderId: "760824077509",
  appId: "1:760824077509:web:f82ad46930983ed438e4ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
