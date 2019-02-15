import React, { Component } from 'react';
import { StoreProvider, createStore } from 'easy-peasy';
import './App.css';
import plainStore, { IStore } from "../../store";
import Subtitles from "../Subtitles/Subtitles";

const store = createStore<IStore>(plainStore);

class App extends Component {
  render() {
    return (
      <div>
        <StoreProvider store={store}>
          <div className="App">
            <header className="App-header">
              <Subtitles/>
            </header>
          </div>
        </StoreProvider>
      </div>
    );
  }
}

export default App;
