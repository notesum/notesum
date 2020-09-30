import { SummaryActions } from "../actions/summaryActions";
import { ContentState, convertToRaw, RawDraftContentState } from 'draft-js';

type SummaryState = {
    content: RawDraftContentState;
}

const initialState: SummaryState = {
    content: convertToRaw(ContentState.createFromText('')),
}

const summaryReducer = ( state: SummaryState = initialState, action: SummaryActions) => {
    switch(action.type) {
        case 'UPDATE_EDITOR_STATE':
            // console.log('Saving state in summary: ', action.payload.getCurrentContent().getPlainText());
            return {
                ...state,
                content: action.payload,
            };
        default:
            return state;
    }
}

export default summaryReducer;