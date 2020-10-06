import { RawDraftContentState } from 'draft-js';

import { EditorActionTypes, UPDATE_EDITOR_STATE } from '../types/editorTypes';

export function updateEditor(content:RawDraftContentState): EditorActionTypes {
    return {
        type: UPDATE_EDITOR_STATE,
        payload: content,
    };
}