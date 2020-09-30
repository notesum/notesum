import { ContentState, RawDraftContentState } from "draft-js";

export interface IUpdateEditorAction {
    readonly type: 'UPDATE_EDITOR_STATE';
    payload: RawDraftContentState;
}

export type SummaryActions =
| IUpdateEditorAction