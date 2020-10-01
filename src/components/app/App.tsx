import React, { Dispatch } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { AppState } from './../redux/reducers';
import { CountActions } from './../redux/actions/countActions';

import logo from '../../resources/logo.svg';
import { add } from '../../add.rs';

import './App.css';

function App() {
  const { count } = useSelector((state: AppState) => state.counter);
  const countDispatch = useDispatch<Dispatch<CountActions>>();
  
  const handleIncrement = () => {
      countDispatch({type: 'INCREMENT'});
  }    
  
  const handleDecrement = () => {
      countDispatch({type: 'DECREMENT'});
  }    
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Formula: {add(1, 3)}</p>
        <div>
            <button onClick={handleDecrement}>-</button>
            {count}
            <button onClick={handleIncrement}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;