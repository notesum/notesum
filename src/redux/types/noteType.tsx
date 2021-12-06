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

export type NoteActionsTypes =
    | INewNoteAction
    | IUpdateNotesList ;

export interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

export interface Notes {
    [id: number]: Note;
}
