import { RawDraftContentState } from 'draft-js';

export const NEW_FILE = 'NEW_FILE';
export interface INewFileAction {
    readonly type: typeof NEW_FILE;
    payload: {
        id: string,
        title: string,
        pdf: string
    };
}

export const UPDATE_FILE_EDITOR_STATE = 'UPDATE_FILE_EDITOR_STATE';
export interface IUpdateEditorState {
    readonly type: typeof UPDATE_FILE_EDITOR_STATE;
    payload: {
        id: string,
        summary: RawDraftContentState,
    };
}

export const UPDATE_FILE_LIST = 'UPDATE_FILE_LIST';
export interface IUpdateFileList {
    readonly type: typeof UPDATE_FILE_LIST;
    payload: Files;
}


export type FilesActionsTypes =
    | INewFileAction
    | IUpdateEditorState
    | IUpdateFileList;

export interface ProjectFile {
    id: string;
    title: string;
    summary: RawDraftContentState;
    currentPage: number;
    pdf: string; // url
}

export interface Files {
    [id: string]: ProjectFile;
}