import { EditorState } from "draft-js";

export interface IUpdateEditorAction {
    readonly type: 'UPDATE_EDITOR_STATE';
    payload: EditorState;
}

export type SummaryActions =
| IUpdateEditorAction