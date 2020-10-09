import { ContentState, convertToRaw } from 'draft-js';

import { FilesActionsTypes, Files, NEW_FILE, UPDATE_FILE_EDITOR_STATE, UPDATE_FILE_LIST } from '../types/filesTypes';

const initialState: Files = {};

const filesReducer = (state = initialState, action: FilesActionsTypes): Files => {
    switch (action.type) {
        case UPDATE_FILE_LIST:
            return action.payload;

        case NEW_FILE:
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    title: action.payload.title,
                    summary: convertToRaw(ContentState.createFromText('')),
                    currentPage: 0,
                    pdf: action.payload.pdf
                }
            };

        case UPDATE_FILE_EDITOR_STATE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    summary: action.payload.summary
                }
            };

        default:
            return state;
    }
};

export default filesReducer;