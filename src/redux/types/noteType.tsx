import {HighlightArea} from '@react-pdf-viewer/highlight';

export const NEW_NOTE = 'NEW_NOTE';
export interface INewNoteAction {
    readonly type: typeof NEW_NOTE;
    payload: Note;
}

export const UPDATE_NOTES_LIST = 'UPDATE_NOTES_LIST';
export interface IUpdateNotesList {
    readonly type: typeof UPDATE_NOTES_LIST;
    payload: Notes;
}

export const DELETE_NOTE = 'DELETE_NOTE';
export interface IDeleteNote {
    readonly type: typeof DELETE_NOTE;
    payload: number;
}

export type NoteActionsTypes =
    | INewNoteAction
    | IUpdateNotesList
    | IDeleteNote;

export interface Note {
    id: number;
    fileId: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

export interface Notes {
    [id: number]: Note;
}
