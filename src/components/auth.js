import styled from "styled-components";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function Auth({ currUsername }) {

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  async function signout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      {currUsername ? (
        <Profile>
          <CurrentUsername>{currUsername}</CurrentUsername>
          <Button onClick={signout}>Sign out</Button>
        </Profile>
      ) : (
        <>
          <Button onClick={signInWithGoogle}>Sign-in with Google</Button>
        </>
      )}
    </Container>
  );
}

export default Auth;

const Container = styled.div``;

const Profile = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.button``;

const CurrentUsername = styled.h3`
  color: black;
`;
