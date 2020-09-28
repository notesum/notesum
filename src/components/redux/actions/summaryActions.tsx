import { EditorState } from "draft-js";

export interface ISetSummaryAction {
    readonly type: 'SET_SUMMARY';
    payload: EditorState;
}

export type SummaryActions =
| ISetSummaryAction