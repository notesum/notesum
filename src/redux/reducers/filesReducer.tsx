import { ContentState, convertToRaw } from 'draft-js';

import { FilesActionsTypes, Files, NEW_FILE, UPDATE_FILE_EDITOR_STATE } from '../types/filesTypes';

const initialState: Files = {};

const filesReducer = (state = initialState, action: FilesActionsTypes): Files => {
    switch (action.type) {
        case NEW_FILE:
            return {
                ...state,
                [action.payload.uuid]: {
                    uuid: action.payload.uuid,
                    name: action.payload.name,
                    summary: convertToRaw(ContentState.createFromText('')),
                    currentPage: 0,
                    pdfUrl: action.payload.pdfUrl
                }
            };

        case UPDATE_FILE_EDITOR_STATE:
            return {
                ...state,
                [action.payload.uuid]: {
                    ...state[action.payload.uuid],
                    summary: action.payload.summary
                }
            };

        default:
            return state;
    }
};

export default filesReducer;