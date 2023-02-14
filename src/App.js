import React, { useEffect, useState } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Auth from "./components/Auth";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [bookList, setBookList] = useState([]);

  const [BookTitle, setBookTitle] = useState("");
  const [BookAuthor, setBookAuthor] = useState("");
  const [BookPages, setBookPages] = useState(0);
  const [BookRead, setBookRead] = useState(false);

  const [currUsername, setCurrUsername] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUsername(user.displayName);
        getBooksFromDb();
      } else {
        setCurrUsername("");
        setBookList([])
      }
    });
  }, []);

  const booksCollectionRef = collection(db, "books");

  async function getBooksFromDb() {
    try {
      const q = query(
        booksCollectionRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const filteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   getBooksFromDb();
  // }, []);

  async function submitBook(e) {
    e.preventDefault();
    try {
      await addDoc(booksCollectionRef, {
        title: BookTitle,
        author: BookAuthor,
        pages: BookPages,
        read: BookRead,
        userId: auth.currentUser.uid,
      });
      getBooksFromDb();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteBook(id) {
    const bookDoc = doc(db, "books", id);
    try {
      await deleteDoc(bookDoc);
      getBooksFromDb();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <Auth currUsername={currUsername} />
      <BookForm
        submitBook={submitBook}
        setBookTitle={setBookTitle}
        setBookAuthor={setBookAuthor}
        setBookPages={setBookPages}
        setBookRead={setBookRead}
      />
      <BookList bookList={bookList} deleteBook={deleteBook} />
    </div>
  );
}

export default App;
