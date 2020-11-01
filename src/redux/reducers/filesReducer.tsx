import { FilesActionsTypes, Files, NEW_FILE, UPDATE_FILE_EDITOR_STATE,
    UPDATE_FILE_LIST, FILE_EDITOR_SAVE, UPDATE_FILE_CURRENT_PAGE } from '../types/filesTypes';

const initialState: Files = {};

const filesReducer = (state = initialState, action: FilesActionsTypes): Files => {
    switch (action.type) {
        case UPDATE_FILE_LIST:
            const newState = {
                ...state
            };

            for (const fileId of Object.keys(action.payload)) {
                if (fileId in newState && newState[fileId].updatedAt > action.payload[fileId].updatedAt) {
                    newState[fileId] = {
                        ...action.payload[fileId],
                        ...newState[fileId]
                    };
                } else if (fileId in newState) {
                    newState[fileId] = {
                        ...newState[fileId],
                        ...action.payload[fileId]
                    };
                } else {
                    newState[fileId] = action.payload[fileId];
                }
            }

            return newState;

        case NEW_FILE:
            return {
                ...state,
                [action.payload.id]: action.payload
            };

        case UPDATE_FILE_EDITOR_STATE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    summary: action.payload.summary,
                    updatedAt: new Date(),
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

        case UPDATE_FILE_CURRENT_PAGE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    currentPage: action.payload.page
                }
            };

        default:
            return state;
    }
};

export default filesReducer;