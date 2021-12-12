import { RawDraftContentState } from 'draft-js';

import {ADD_NOTE_FILE, Files, FilesActionsTypes, UPDATE_FILE_EDITOR_STATE, UPDATE_FILE_LIST} from '../types/filesTypes';

export function updateFileList(files: Files): FilesActionsTypes {
    return {
        type: UPDATE_FILE_LIST,
        payload: files
    };
}

export function updateEditor(id: string, content: RawDraftContentState): FilesActionsTypes {
    return {
        type: UPDATE_FILE_EDITOR_STATE,
        payload: {
            id,
            summary: content
        },
    };
}

export function addNoteToFile(noteId: number, fileId: number): FilesActionsTypes {
    return {
        type: ADD_NOTE_FILE,
        payload: {
            noteId,
            fileId
        }
    };
}