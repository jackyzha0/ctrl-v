import React from 'react';
import NewPaste from './NewPaste'
import ViewPaste from './ViewPaste'
import Footer from './Footer'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const SpacedTitle = styled.div`
    margin-top: 10vh
`

const Desc = () => {
  return (
    <h3>a modern, <a href="https://github.com/jackyzha0/ctrl-v" target="_blank" rel="noopener noreferrer">open-source</a> pastebin with latex and markdown rendering support</h3>
  );
}

const GetPasteWithParam = () => {
  let { hash } = useParams();

  return (
    <ViewPaste hash = {hash} />
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

        <Switch>
          <Route path="/:hash" 
            children={<GetPasteWithParam />} 
          />
          <Route path="/">
            <NewPaste />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
