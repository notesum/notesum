import { EditorState } from "draft-js";

type testState = {
    editorState: EditorState;
}

const initialState = {
    editorState: EditorState.createEmpty(),
  };
  
const testReducer = (state = initialState, { payload, type }) => {
    if (type === 'UPDATE_EDITOR_STATE') {
      console.log('redux action: ', type, payload.getCurrentContent().getPlainText());
      return {
        ...state,
        editorState: payload,
      };
    }
    return state;
  };

export default testReducer;