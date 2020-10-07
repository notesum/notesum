import { ContentState, convertToRaw } from 'draft-js';

import { EditorState, EditorActionTypes, UPDATE_EDITOR_STATE } from './../types/editorTypes';

const initialState: EditorState = {
    content: convertToRaw(ContentState.createFromText('')),
};

const editorReducer = ( state = initialState, action: EditorActionTypes) => {
    switch(action.type) {
        case UPDATE_EDITOR_STATE:
            // console.log('Saving state in summary: ', action.payload.getCurrentContent().getPlainText());
            return {
                ...state,
                content: action.payload,
            };
        default:
            return state;
    }
};

export default editorReducer;