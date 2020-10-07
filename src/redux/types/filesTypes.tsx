import { RawDraftContentState } from 'draft-js';

export const NEW_FILE = 'NEW_FILE';
export interface INewFileAction {
    readonly type: typeof NEW_FILE;
    payload: {
        uuid: string,
        name: string,
        pdfUrl: string
    };
}

export const UPDATE_FILE_EDITOR_STATE = 'UPDATE_FILE_EDITOR_STATE';
export interface IUpdateEditorState {
    readonly type: typeof UPDATE_FILE_EDITOR_STATE;
    payload: {
        uuid: string,
        summary: RawDraftContentState,
    };
}


export type FilesActionsTypes =
    | INewFileAction
    | IUpdateEditorState;

export interface Files {
    [uuid: string]: {
        uuid: string,
        name: string,
        summary: RawDraftContentState,
        currentPage: number,
        pdfUrl: string
    };
}