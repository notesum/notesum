import {NoteActionsTypes, Notes, UPDATE_NOTES_LIST} from '../types/noteType';

export function updateNotesList(notes: Notes): NoteActionsTypes {
    return {
        type: UPDATE_NOTES_LIST,
        payload: notes
    };
}