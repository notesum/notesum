import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from './../redux/reducers';
import { File } from './../redux/types/fileTypes';
import { loadFiles } from './../redux/asynchActions/fileAsynchActions';

function Test() {
    const  files:File[] = useSelector((state:AppState)=>state.files.files);
    const dispatch = useDispatch();

    const getFiles = () => {
        dispatch(loadFiles());
    };
    return (
    <div className="App">
        <header className="App-header">
        <ul>
            {files.map(file => (
                <li key={file.id}>{file.file}</li>
            ))}
        </ul>
        <button onClick={getFiles}>Get files</button>
        </header>
    </div>
    );
}

export default Test;