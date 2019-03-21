import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { FocusStyleManager } from "@blueprintjs/core";
import { StoreProvider, createStore } from 'easy-peasy';
import plainStore, { IStore } from "../../store";
import Player from "../Player/Player";
import { ThemeProvider } from "../../themes/context";
import Home from '../Home/Home';
import Common from "../Common/Common";
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './App.css';
import { Sidebar } from "../Sidebar/Sidebar";
import * as Styled from './styled';

FocusStyleManager.onlyShowFocusOnTabs();

const store = createStore<IStore>(plainStore);

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <StoreProvider store={store}>
          <Router basename={process.env.PUBLIC_URL}>
            <Common/>
            <Styled.App>
              <Sidebar/>
              <Styled.PageContainer>
                <div>
                  <Route exact path="/" component={Home}/>
                  <Route path="/play/:id" component={Player}/>
                  <Route exact path="/play" component={Player}/>
                </div>
              </Styled.PageContainer>
            </Styled.App>
          </Router>
        </StoreProvider>
      </ThemeProvider>
    );
  }
}

export default App;
