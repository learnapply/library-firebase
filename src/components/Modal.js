import React from "react";
import styled from "styled-components";

function BookForm({
  isModalOpen,
  setIsModalOpen,
  submitBook,
  setBookTitle,
  setBookAuthor,
  setBookPages,
  setBookRead,
}) {
  if (!isModalOpen) return null;
  return (
    <Overlay>
      <Container>
        <p onClick={() => setIsModalOpen(false)}>Close</p>
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
      </Container>
    </Overlay>
  );
}

export default BookForm;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  background-color: #f1f1f1;
  margin: 15% auto;
  padding: 16px 24px;
  border: 1px solid #888;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  border-radius: 5px;
`;
