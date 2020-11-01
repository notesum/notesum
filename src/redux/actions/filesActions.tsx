import { RawDraftContentState } from 'draft-js';

import { Files, FilesActionsTypes, UPDATE_FILE_CURRENT_PAGE, UPDATE_FILE_EDITOR_STATE, UPDATE_FILE_LIST } from '../types/filesTypes';

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

export function updateCurrentPage(id: string, page: number): FilesActionsTypes {
    return {
        type: UPDATE_FILE_CURRENT_PAGE,
        payload: {
            id,
            page
        }
    };
}