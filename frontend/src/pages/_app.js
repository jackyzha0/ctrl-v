import React from 'react'
import ThemeProvider from "../theme/ThemeProvider";
import GlobalStyle from "../theme/GlobalStyle";
import styled from "styled-components";

const Main = styled.div`
  margin-top: 10vh;
  padding: 0 20vw 30px 20vw;
`

const App = ({ Component, pageProps }) => (
  <ThemeProvider>
    <GlobalStyle />
    <Main id="appElement">
      <Component {...pageProps} />
    </Main>
  </ThemeProvider>
)

export default App