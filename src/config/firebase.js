import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsRtrhjbl5Mp5vCc_pyC7cvCDc55o2-u4",
  authDomain: "lib2-33750.firebaseapp.com",
  projectId: "lib2-33750",
  storageBucket: "lib2-33750.appspot.com",
  messagingSenderId: "1076298148242",
  appId: "1:1076298148242:web:ed26132eceab306beeb94b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
