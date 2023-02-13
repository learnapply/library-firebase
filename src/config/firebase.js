import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB1ixiHV9pfhfeKcWuuLy6F6LbQLPYu34",
  authDomain: "lib3-cc1dc.firebaseapp.com",
  projectId: "lib3-cc1dc",
  storageBucket: "lib3-cc1dc.appspot.com",
  messagingSenderId: "191973939617",
  appId: "1:191973939617:web:94ab7b1c80fe52a78153e0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
