import { FileActionTypes, ADD_FILES, GET_FILES, REPLACE_FILES, File } from './../types/fileTypes';

export function getFiles(): FileActionTypes {
    return {
        type: GET_FILES,
    };
}

export function addFiles(files:File[]): FileActionTypes {
    return {
        type: ADD_FILES,
        payload: files,
    };
}

export function replaceFiles(files:File[]): FileActionTypes {
    // console.log('replaceFiles says:',files);
    return {
        type: REPLACE_FILES,
        payload: files,
    };
}