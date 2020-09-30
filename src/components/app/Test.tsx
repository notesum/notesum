import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './../redux/reducers';
import { SummaryActions } from './../redux/actions/summaryActions';
import { Editor, EditorState } from 'draft-js';

const App = () => {
  const {editorState} = useSelector((state: AppState) => state.summary);
  const editorDispatch = useDispatch<Dispatch<SummaryActions>>();

  const save = (state: EditorState) => editorDispatch({ type: "UPDATE_EDITOR_STATE", payload: state });

  return (
    <div>
      <Editor editorState={editorState} onChange={save} />
    </div>
  );
};

export default App;