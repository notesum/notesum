import { RawDraftContentState } from 'draft-js';
import { v4 as uuidv4 } from 'uuid';

import { FilesActionsTypes, NEW_FILE, UPDATE_FILE_EDITOR_STATE } from '../types/filesTypes';

export function newFile(name: string, pdf: Int8Array): FilesActionsTypes {

    // TODO upload pdf to actual storage
    // (And of course create a new file)

    return {
        type: NEW_FILE,
        payload: {
            uuid: uuidv4(),
            name,
            pdfUrl: 'TODO'
        }
    };
}

export function updateEditor(uuid: string, content: RawDraftContentState): FilesActionsTypes {
    return {
        type: UPDATE_FILE_EDITOR_STATE,
        payload: {
            uuid,
            summary: content
        },
    };
}