import {NEW_NOTE, NoteActionsTypes, Notes} from '../types/noteType';

const initialState: Notes = {};

const noteReducer = (state = initialState, action: NoteActionsTypes): Notes => {
    switch (action.type) {
        case NEW_NOTE:
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    content: action.payload.content,
                    highlightAreas: action.payload.highlightAreas,
                    quote: action.payload.quote
                }
            };
        default:
            return state;
    }
};

export default noteReducer;