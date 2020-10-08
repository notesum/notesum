export const GET_FILES = 'GET_FILES';
export const ADD_FILES = 'ADD_FILES';
export const REPLACE_FILES = 'REPLACE_FILES';

interface IGetFiles {
    readonly type: typeof GET_FILES;
}

interface IAddFiles {
    readonly type: typeof ADD_FILES;
    payload: File[];
}

interface IReplaceFiles {
    readonly type: typeof REPLACE_FILES;
    payload: File[];
}

export type FileActionTypes =
| IGetFiles
| IAddFiles
| IReplaceFiles
;

export interface File {
    id: number;
    file: string;
}

export interface FileState {
    files: File[];
}