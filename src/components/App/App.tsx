import React, { Component } from 'react';
import { StoreProvider, createStore } from 'easy-peasy';
import plainStore, { IStore } from "../../store";
import Main from "../Main/Main";

import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

const store = createStore<IStore>(plainStore);

class App extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Main/>
      </StoreProvider>
    );
  }
}

export default App;
