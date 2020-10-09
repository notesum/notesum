import { RawDraftContentState } from 'draft-js';

import { Files, FilesActionsTypes, UPDATE_FILE_EDITOR_STATE, UPDATE_FILE_LIST } from '../types/filesTypes';

// export function newFile(name: string, pdf: Int8Array): FilesActionsTypes {

//     // TODO upload pdf to actual storage
//     // (And of course create a new file)

//     return {
//         type: NEW_FILE,
//         payload: {
//             id: uuidv4(),
//             name,
//             pdfUrl: 'TODO'
//         }
//     };
// }

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