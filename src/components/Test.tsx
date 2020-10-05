import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequest } from './../redux/User/actions';
import { AppState } from './../redux/reducers';
import { UserActionTypes } from './../redux/User/types';

function Test() {

    // const { data } = useSelector((state:AppState)=>state.file)
    // const dataDispatch = useDispatch<Dispatch<FileActions>>();
    const { data } = useSelector((state:AppState)=>state.user);
    const userDispatch = useDispatch<Dispatch<UserActionTypes>>();

    useEffect(() => {
        userDispatch(fetchRequest());
    }, []);

  return (
    <div className="App">
      <header className="App-header">   
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
            {data[0]}
        </p>
      </header>
    </div>
  );
}

export default Test;
