import { RawDraftContentState } from 'draft-js';

export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';

interface IUpdateEditorAction {
    readonly type: typeof UPDATE_EDITOR_STATE;
    payload: RawDraftContentState;
}

export type EditorActionTypes =
| IUpdateEditorAction;

export interface EditorState {
    content: RawDraftContentState;
}