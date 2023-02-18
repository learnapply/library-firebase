import React from 'react'
import styled from 'styled-components'
import Auth from './Auth'

function Header({currUsername}) {
  return (
    <Container>
      <h1>library.</h1>
      <Auth currUsername={currUsername} />
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightcoral;
  color: black;
  padding: 1rem;
`