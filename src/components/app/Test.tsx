import React, { useState, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './../redux/reducers';
import { SummaryActions } from './../redux/actions/summaryActions';
import { convertToRaw, convertFromRaw, Editor, EditorState } from 'draft-js';

const App = () => {
  const {content} = useSelector((state: AppState) => state.summary);
  const editorDispatch = useDispatch<Dispatch<SummaryActions>>();
  const [editor, setEditor] = useState(EditorState.createWithContent(convertFromRaw(content)));

  const handleEditorChange = (editorState: EditorState) => {
    const content = convertToRaw(editorState.getCurrentContent())
    editorDispatch({ type: "UPDATE_EDITOR_STATE", payload: content });
    setEditor(editorState);
  }

  return (
    <div>
      <Editor editorState={editor} onChange={handleEditorChange} />
    </div>
  );
};

export default App;