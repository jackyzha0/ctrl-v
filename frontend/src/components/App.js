import React from 'react';
import PasteArea from './PasteArea'
import Footer from './Footer'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const SpacedTitle = styled.div`
    margin-top: 10vh
`

const Inline = styled.div`
    display: inline-block
`

const Desc = () => {
  return (
    <h3>a modern, <a href="https://github.com/jackyzha0/ctrl-v" target="_blank" rel="noopener noreferrer">open-source</a> pastebin with latex and markdown rendering support</h3>
  );
}

function App() {
  return (
    <Router>
      <div className="lt-content-column">
        <SpacedTitle>
          <nav>
            <h1 className="mainLogo">
              <span role="img" aria-label="clipboard">📋&nbsp;</span>
              <Link to="/">ctrl-v</Link>
            </h1>

            <Desc />
          </nav>
        </SpacedTitle>

        <PasteArea/>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
