import { ContentState, convertToRaw } from 'draft-js';

import { FilesActionsTypes, Files, NEW_FILE, UPDATE_FILE_EDITOR_STATE,
    UPDATE_FILE_LIST, FILE_EDITOR_SAVE } from '../types/filesTypes';

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
                    summary: action.payload.summary,
                    needsSave: true,
                    lastSavedSummary: !state[action.payload.id].needsSave ? state[action.payload.id].summary : state[action.payload.id].lastSavedSummary
                }
            };

        case FILE_EDITOR_SAVE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    needsSave: false,
                    lastSavedSummary: state[action.payload.id].summary
                }
            };

        default:
            return state;
    }
};

export default filesReducer;