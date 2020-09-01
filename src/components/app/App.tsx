import React from 'react';
import logo from '../../resources/logo.svg';
import './App.css';

import { add } from '../../add.rs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Formula: {add(1, 3)}</p>
      </header>
    </div>
  );
}

export default App;
