import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function Auth({ currUsername }) {
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("signed in");
    } catch (error) {
      console.error(error);
    }
  }

  async function signout() {
    try {
      await signOut(auth);
      console.log("signed out");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-container">
      <button onClick={signInWithGoogle}>Sign-in with Google</button>
      <button onClick={signout}>Sign out</button>
      <div>
        <p>{currUsername}</p>
      </div>
    </div>
  );
}

export default Auth;