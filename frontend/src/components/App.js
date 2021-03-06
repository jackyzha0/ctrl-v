import React from 'react';
import NewPaste from './NewPaste'
import ViewPaste from './ViewPaste'
import Footer from './Footer'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Raw from './renderers/Raw'

const Logo = styled.div`
    position: absolute;
    bottom: 1.5em;
    left: 2em;
    opacity: 0.3;
    
    & h1 {
      font-size: 3rem;
    }
`

const Main = styled.main`
  margin-top: 10vh;
`

const GetPasteWithParam = () => {
  let { hash } = useParams();
  return <ViewPaste hash = {hash} />;
}

const GetRawWithParam = () => {
  let { hash } = useParams();
  return <Raw hash={hash} />;
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/raw/:hash"
          children={<GetRawWithParam />}
        />
        <Route>
          <div className="lt-content-column">
            <Logo>
              <nav>
                <h1 className="mainLogo">
                  <a href="https://github.com/jackyzha0/ctrl-v">ctrl-v</a>
                </h1>
              </nav>
            </Logo>

            <Main id="appElement">
              <Switch>
                <Route path="/:hash"
                  children={<GetPasteWithParam />}
                />
                <Route path="/">
                  <NewPaste />
                </Route>
              </Switch>
            </Main>

            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
