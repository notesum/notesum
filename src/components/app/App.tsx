import React, { Dispatch } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { AppState } from './../redux/reducers';
import { CountActions } from './../redux/actions/countActions';
import { NameActions } from './../redux/actions/nameActions';


import logo from '../../resources/logo.svg';
import { add } from '../../add.rs';

import './App.css';

function App() {
  const { count } = useSelector((state: AppState) => state.count);
  const { name } = useSelector((state: AppState) => state.name);
  const countDispatch = useDispatch<Dispatch<CountActions>>();
  const nameDispatch = useDispatch<Dispatch<NameActions>>();    
  
  const handleIncrement = () => {
      countDispatch({type: 'INCREMENT'});
  }    
  
  const handleDecrement = () => {
      countDispatch({type: 'DECREMENT'});
  }    
  
  const handleSetName = 
      (e: React.ChangeEvent<HTMLInputElement>) => {
      nameDispatch({type: 'SET_NAME', payload: e.target.value})
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Formula: {add(1, 3)}</p>
        <div>
            <button onClick={handleIncrement}>+</button>
            {count}
            <button onClick={handleDecrement}>-</button>
        </div>
        <div>
            <input type="text" onChange={handleSetName}/>
            {name}
        </div>
      </header>
    </div>
  );
}

export default App;