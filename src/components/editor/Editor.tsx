import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Highlight from './Highlight'

export default function TextEditor() {
  const [contentState, setContentState] = useState(ContentState.createFromText(''));
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);


  function addNewEntity(t) {


    const content = editorState.getCurrentContent();
    const targetRange = editorState.getSelection();

    const newContentState = Modifier.insertText(
      content,
      targetRange,
      (t + '\n')
    );
    setContentState(newContentState);

    const newState = EditorState.push(
      editorState,
      newContentState
    );

    setEditorState(newState);

  }
  
  return (
    <div>
      {/* The highlighter */}
      <Highlight call={addNewEntity}/>

      <div className="editorContainer" onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={newEditorState => setEditorState(newEditorState)}
        />
      </div>
    </div>
  );
}