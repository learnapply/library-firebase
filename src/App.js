import React, { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

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

  useEffect(() => {
    getBooksFromDb();
  }, []);

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
      <div>
        <form onSubmit={submitBook}>
          <input
            placeholder="title"
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
          <input
            placeholder="author"
            onChange={(e) => setBookAuthor(e.target.value)}
            required
          />
          <input
            placeholder="pages"
            type="number"
            onChange={(e) => setBookPages(+e.target.value)}
            required
          />
          <label>
            read?
            <input
              type="checkbox"
              onChange={(e) => setBookRead(e.target.checked)}
            />
          </label>
          <button>add book</button>
        </form>
      </div>
      <div>
        {bookList.map((book) => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <p>{book.read ? "read" : "not read"}</p>
            <p>{book.pages}</p>
            <button onClick={() => deleteBook(book.id)}>delete book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
