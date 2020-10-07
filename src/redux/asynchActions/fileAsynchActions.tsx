import { Dispatch } from 'react';

import { FileActionTypes } from '../types/fileTypes';

export function loadFiles() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json'},
    };
    return (dispatch: Dispatch<FileActionTypes>) => {
        fetch('http://localhost:8080/api/test', requestOptions)
        .then(async response => {
            const data = await response.json();
            // console.log("Thunk says:",data);
            // TODO
            // dispatch(
            //     replaceFiles(data.data)
            // );
        });
    };
}