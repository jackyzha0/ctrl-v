import React from 'react';
import NewPaste from './components/NewPaste'
import ViewPaste from './components/ViewPaste'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Raw from './components/renderers/Raw'
import ThemeProvider from './theme/ThemeProvider'
import GlobalStyle from './theme/GlobalStyle'
import {Watermark} from "./components/Watermark";

const Main = styled.div`
  margin-top: 10vh;
  padding: 0 20vw 30px 20vw;
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
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/raw/:hash"><GetRawWithParam /></Route>
          <Route>
            <Watermark/>
            <Main id="appElement">
              <Switch>
                <Route path="/:hash">
                  <GetPasteWithParam />
                </Route>
                <Route path="/">
                  <NewPaste />
                </Route>
              </Switch>
            </Main>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}


export default App;
