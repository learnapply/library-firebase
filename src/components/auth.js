import styled from "styled-components";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

function Auth({ currUsername }) {
  // somehow sign in state is reset to false everytime 
  // page reloads, need to get the state from app or backend
  const [loggedIn, setLoggedIn] = useState(false);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function signout() {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      {loggedIn ? (
        <Button onClick={signout}>Sign out</Button>
      ) : (
        <>
          <Button onClick={signInWithGoogle}>Sign-in with Google</Button>
          <CurrentUsername>{currUsername}</CurrentUsername>
        </>
      )}
    </Container>
  );
}

export default Auth;

const Container = styled.div`

`;

const Button = styled.button``;

const CurrentUsername = styled.h3`
  color: black;
`
