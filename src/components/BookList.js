import React from 'react'

function BookList({bookList, deleteBook}) {
  return (
    <div className='booklist-container'>
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
  )
}

export default BookList