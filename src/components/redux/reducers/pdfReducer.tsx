import { PDFActions } from "../actions/pdfActions";
type pdfState = {
    currentPage: number;
}

const initialState: pdfState = {
    currentPage: 1,
}

const pdfReducer = ( state: pdfState = initialState, action: PDFActions) => {
    switch(action.type) {
        case 'UPDATE_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
}

export default pdfReducer;