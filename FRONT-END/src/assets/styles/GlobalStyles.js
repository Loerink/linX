import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  body {
    background-color: #f0f0f0;
    color: #333;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;