import React from "react";
import styled from "styled-components";

function BookList({ bookList, deleteBook, updateBook, setIsModalOpen }) {
  return (
    <Container>
      {bookList ? (
        <>
          {bookList.map((book) => (
            <BookCard key={book.id}>
              <p>{book.title}</p>
              <p>
                <em>by</em> {book.author}
              </p>
              <p>
                {book.pages} <em>pages</em>{" "}
              </p>
              <p onClick={() => updateBook(book.id, book.read)}>
                {book.read ? "read" : "not read"}
              </p>
              <DeleteBook onClick={() => deleteBook(book.id)}>
                delete book
              </DeleteBook>
            </BookCard>
          ))}
          <AddBook onClick={() => setIsModalOpen(true)}> + </AddBook>
        </>
      ) : (
        <>please sign in too see your books</>
      )}
    </Container>
  );
}

export default BookList;

const Container = styled.div`
  margin: 4rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BookCard = styled.div`
  font-size: 1.1rem;
  line-height: 34px;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  width: 300px;
  height: 200px;
  transition: 0.2s;
  position: relative;
  > p:nth-child(4) {
    color: purple;
    &:hover {
      cursor: pointer;
    }
  }
`;

const DeleteBook = styled.p`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-weight: 100;
  color: purple;
  &:hover {
    cursor: pointer;
  }
`;

const AddBook = styled(BookCard)`
  user-select: none;
  font-size: 5rem;
  color: gray;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  &:active {
    cursor: pointer;
    transform: scale(0.99);
  }
`;
