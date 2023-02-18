import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  body {
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyle;
