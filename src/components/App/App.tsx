import React, { Component } from 'react';
// import { Router, Link, createHistory, LocationProvider } from "@reach/router"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { FocusStyleManager } from "@blueprintjs/core";
import { StoreProvider, createStore } from 'easy-peasy';
import plainStore, { IStore } from "../../store";
import Player from "../Player/Player";
import Tasks from "../Tasks/Tasks";

import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './App.css';
import Home from '../Home/Home';

FocusStyleManager.onlyShowFocusOnTabs();

const store = createStore<IStore>(plainStore);

class App extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/play/:id" component={Player}/>
            <Route exact path="/play" component={Player}/>
            <Tasks/>
          </div>
        </Router>
      </StoreProvider>
    );
  }
}

export default App;
