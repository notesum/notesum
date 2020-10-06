import { ADD_FILES, FileActionTypes, GET_FILES, File } from './../types/fileTypes';

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
    return {
        type: ADD_FILES,
        payload: files,
    };
}