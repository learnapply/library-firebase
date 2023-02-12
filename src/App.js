import React, { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [bookList, setBookList] = useState([]);

  const [BookTitle, setBookTitle] = useState("");
  const [BookAuthor, setBookAuthor] = useState("");
  const [BookPages, setBookPages] = useState(0);
  const [BookRead, setBookRead] = useState(false);

  const booksCollectionRef = collection(db, "books");

  async function getBooksFromDb() {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
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
  });

  async function submitBook() {
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
    await deleteDoc(bookDoc);
    getBooksFromDb();
  }

  return (
    <div className="app">
      <Auth />
      <div>
        <input
          placeholder="title"
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <input
          placeholder="author"
          onChange={(e) => setBookAuthor(e.target.value)}
        />
        <input
          placeholder="pages"
          type="number"
          onChange={(e) => setBookPages(+e.target.value)}
        />
        <label>
          read?
          <input
            type="checkbox"
            onChange={(e) => setBookRead(e.target.checked)}
          />
        </label>
        <button onClick={submitBook}>add book</button>
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
