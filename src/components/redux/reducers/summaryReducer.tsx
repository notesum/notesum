import { EditorState } from "draft-js";
import { SummaryActions } from "../actions/summaryActions";
import { ContentState } from 'draft-js';

type SummaryState = {
    editorState: EditorState;
}

const initialState: SummaryState = {
    editorState: EditorState.createWithContent(ContentState.createFromText('')),
}

const summaryReducer = ( state: SummaryState = initialState, action: SummaryActions) => {
    switch(action.type) {
        case 'SET_SUMMARY':
            return {
                ...state,
                editorState: action.payload,
            };
        default:
            return state;
    }
}

export default summaryReducer;