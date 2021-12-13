import {ContentState, convertToRaw} from 'draft-js';

import {
    ADD_NOTE_FILE,
    FILE_EDITOR_SAVE,
    Files,
    FilesActionsTypes,
    NEW_FILE,
    REMOVE_NOTE_FILE,
    UPDATE_FILE_EDITOR_STATE,
    UPDATE_FILE_LIST
} from '../types/filesTypes';

const initialState: Files = {};

const filesReducer = (state = initialState, action: FilesActionsTypes): Files => {
    switch (action.type) {
        case UPDATE_FILE_LIST:
            const newState = {
                ...state
            };

            for (const fileId of Object.keys(action.payload)) {
                newState[fileId] = {
                    ...(fileId in newState ? newState[fileId] : {}),
                    ...action.payload[fileId]
                };
            }
            console.log('UPDATE_FILE_LIST', newState);

            return newState;

        case NEW_FILE:
            const State = {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    title: action.payload.title,
                    summary: convertToRaw(ContentState.createFromText('')),
                    notes: [],
                    currentPage: 0,
                    pdf: action.payload.pdf
                }
            };
            console.log('NEW_FILE', State);
            return State;

        case UPDATE_FILE_EDITOR_STATE:
            const State2 = {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    summary: action.payload.summary,
                    needsSave: true,
                    lastSavedSummary: !state[action.payload.id].needsSave ? state[action.payload.id].summary : state[action.payload.id].lastSavedSummary
                }
            };
            console.log('UPDATE_FILE_EDITOR_STATE', State2);
            return State2;

        case FILE_EDITOR_SAVE:
            const State3 = {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    needsSave: false,
                    lastSavedSummary: state[action.payload.id].summary
                }
            };
            console.log('FILE_EDITOR_SAVE', State3);
            return State3;

        case ADD_NOTE_FILE:
            const State4 = {
                ...state,
                [action.payload.fileId]: {
                    ...state[action.payload.fileId],
                    notes: [...state[action.payload.fileId].notes, action.payload.noteId]
                }
            };
            console.log('ADD_NOTE_FILE', State4);
            return State4;

        case REMOVE_NOTE_FILE:
            const currentState = {
                ...state,
                [action.payload.fileId]: {
                    ...state[action.payload.fileId],
                    notes: [...state[action.payload.fileId].notes.filter(noteId => noteId !== action.payload.noteId)]
                }
            };
            console.log('REMOVE_NOTE_FILE', currentState);
            return currentState;

        default:
            return state;
    }
};

export default filesReducer;