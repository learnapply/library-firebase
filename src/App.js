import React, { useEffect, useState, useCallback } from "react";
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

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPages, setBookPages] = useState(0);
  const [bookRead, setBookRead] = useState(false);

  const [currUsername, setCurrUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUsername(user.displayName);
        getBooksFromDb();
      } else {
        setCurrUsername("");
        setBookList([]);
      }
    });
    return unsubscribe;
  }, []);

  const booksCollectionRef = collection(db, "books");

  const getBooksFromDb = useCallback(async () => {
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
  }, [booksCollectionRef]);

  const submitBook = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await addDoc(booksCollectionRef, {
          title: bookTitle,
          author: bookAuthor,
          pages: bookPages,
          read: bookRead,
          userId: auth.currentUser.uid,
        });
        getBooksFromDb();
      } catch (error) {
        console.error(error);
      }
    },
    [
      booksCollectionRef,
      bookTitle,
      bookAuthor,
      bookPages,
      bookRead,
      getBooksFromDb,
    ]
  );

  const deleteBook = useCallback(async (id) => {
    const bookDoc = doc(db, "books", id);
    try {
      await deleteDoc(bookDoc);
      getBooksFromDb();
    } catch (error) {
      console.error(error);
    }
  }, []);

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
