import {DELETE_NOTE, NEW_NOTE, NoteActionsTypes, Notes, UPDATE_NOTES_LIST} from '../types/noteType';

const initialState: Notes = {};

const noteReducer = (state = initialState, action: NoteActionsTypes): Notes => {
    let notes: Notes;
    switch (action.type) {
        case UPDATE_NOTES_LIST:
            notes = {...state};
            for(const noteId of Object.keys(action.payload)) {
                notes[noteId] = {
                    ...(noteId in notes
                        ? notes[noteId]
                        : {}),
                    ...action.payload[noteId]
                };
            }
            return notes;

        case NEW_NOTE:
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    fileId: action.payload.fileId,
                    content: action.payload.content,
                    highlightAreas: action.payload.highlightAreas,
                    quote: action.payload.quote
                }
            };

        case DELETE_NOTE:
            const currentState = {...state};
            delete currentState[action.payload];
            return currentState;

        default:
            return state;
    }
};

export default noteReducer;