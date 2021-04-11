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
      <link rel="icon" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&display=swap"
            rel="stylesheet" />
      <title>ctrl-v | a modern, open-source pastebin</title>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DE1TYY2F24" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DE1TYY2F24');
              `
        }}
      />
    </Head>
    <Main id="appElement">
      <Component {...pageProps} />
    </Main>
  </ThemeProvider>
)

export default App