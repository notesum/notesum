import { ADD_FILES, FileActionTypes, FileState, GET_FILES, REPLACE_FILES } from '../types/fileTypes';

const initialState: FileState = {
    files: [],
};

const fileReducer = ( state = initialState, action: FileActionTypes) => {
    switch(action.type) {
        case ADD_FILES:
            return {
                ...state,
                files: [...state.files, ...action.payload],
            };
        case REPLACE_FILES:
            return {
                ...state,
                files: [...action.payload]
            };

        default:
            return state;
    }
};

export default fileReducer;