import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import TextSelector from 'text-selection-react'



export default function TextEditor() {
  const [contentState, setContentState] = useState(ContentState.createFromText(""));
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor()
  }, []);


  function addNewEntity(t) {


    let content = editorState.getCurrentContent()
    let targetRange = editorState.getSelection();

    let newContentState = Modifier.insertText(
      content,
      targetRange,
      (t + '\n')
    );
    setContentState(newContentState)

    let newState = EditorState.push(
      editorState,
      newContentState
    );

    setEditorState(newState)

  }



  return (
    <>
      <TextSelector
        events={[
          {
            text: 'Add',
            handler: (html, text) => { addNewEntity(text) }
          }
        ]}
        color={'yellow'}
        colorText={false}
      />
      <div className="editorContainer" onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
        />
      </div>
    </>
  );
}