import React from 'react';
import './App.css';
import {Game} from "./Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          Welcome to the game
        </p>
        <Game></Game>
      </header>
    </div>
  );
}

export default App;
