import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from './../redux/reducers';
import { FileActionTypes, File } from './../redux/types/fileTypes';
import { loadFiles } from './../redux/asynchActions/fileAsynchActions';

function Test() {

    // const { data } = useSelector((state:AppState)=>state.file)
    // const dataDispatch = useDispatch<Dispatch<FileActions>>();
    const  files:File[] = useSelector((state:AppState)=>state.files.files);
    const fileDispatch = useDispatch();

    const getFiles = () => {
        fileDispatch(loadFiles());
    };
    return (
    <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
            {files.map(file => (
      <div  key={file.id}>{file.file}</div>
    ))}
        </p>
        <button onClick={getFiles}>Get files</button>
        </header>
    </div>
    );
}

export default Test;