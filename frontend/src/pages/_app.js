import React from 'react'
import ThemeProvider from "../theme/ThemeProvider";
import GlobalStyle from "../theme/GlobalStyle";
import styled from "styled-components";
import Head from "next/head";

const Main = styled.div`
  margin-top: 10vh;
  padding: 0 20vw 30px 20vw;
`

const App = ({ Component, pageProps }) => (
  <ThemeProvider>
    <GlobalStyle />
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content="#ffffff"/>
      <meta
        name="description"
        content="a modern, open-source pastebin with latex and markdown rendering support"
      />
      <title>ctrl-v | a modern, open-source pastebin</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Main id="appElement">
      <Component {...pageProps} />
    </Main>
  </ThemeProvider>
)

export default App