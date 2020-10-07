import { PDFActionTypes, PdfState, UPDATE_CURRENT_PAGE } from '../types/pdfTypes';

const initialState: PdfState = {
    currentPage: 1,
};

const pdfReducer = ( state = initialState, action: PDFActionTypes) => {
    switch(action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
};

export default pdfReducer;