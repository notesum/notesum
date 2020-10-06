import { PDFActionTypes, UPDATE_CURRENT_PAGE } from '../types/pdfTypes';

export function updateCurrentPage(page:number): PDFActionTypes {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: page,
    };
}