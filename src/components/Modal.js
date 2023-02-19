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
        <Form onSubmit={submitBook}>
          <Input
            placeholder="title"
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
          <Input
            placeholder="author"
            onChange={(e) => setBookAuthor(e.target.value)}
            required
          />
          <Input
            placeholder="pages"
            type="number"
            onChange={(e) => setBookPages(+e.target.value)}
            required
          />
          <label>
            read?
            <Input
              type="checkbox"
              onChange={(e) => setBookRead(e.target.checked)}
            />
          </label>
          <Button>add book</Button>
        </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 16px 10px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px;
  font-size: 16px;
  font-weight: 900;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  background-color: purple;
  border: none;
  border-radius: 5px;
  font-size: large;
  font-weight: bold;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px;
`;
