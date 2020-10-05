export interface IUpdateCurrentPageAction {
    readonly type: 'UPDATE_CURRENT_PAGE';
    payload: number;
}

export type PDFActions = 
| IUpdateCurrentPageAction;