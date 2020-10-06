export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

export interface IUpdateCurrentPageAction {
    readonly type: typeof UPDATE_CURRENT_PAGE;
    payload: number;
}

export type PDFActionTypes =
| IUpdateCurrentPageAction;

export interface PdfState {
    currentPage: number;
}