import {HighlightArea} from '@react-pdf-viewer/highlight';

export const NEW_NOTE = 'NEW_NOTE';
export interface INewNoteAction {
    readonly type: typeof NEW_NOTE;
    payload: Note;
}

export type NoteActionsTypes =
    INewNoteAction;

export interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

export interface Notes {
    [id: number]: Note;
}
