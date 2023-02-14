import React from "react";

function BookForm({
  submitBook,
  setBookTitle,
  setBookAuthor,
  setBookPages,
  setBookRead,
}) {
  return (
    <div className="bookform-container">
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
  );
}

export default BookForm;
