import {DELETE_NOTE, NoteActionsTypes, Notes, UPDATE_NOTES_LIST} from '../types/noteType';

export function updateNotesList(notes: Notes): NoteActionsTypes {
    return {
        type: UPDATE_NOTES_LIST,
        payload: notes
    };
}

export function deleteNote(noteId: number): NoteActionsTypes {
    return {
        type: DELETE_NOTE,
        payload: noteId
    };
}