import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup } from '@material-ui/core';

import Highlight from './Highlight';

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


  function highlightCallback(t) {

    const content = editorState.getCurrentContent();
    const targetRange = editorState.getSelection();

    const newContentState = Modifier.insertText(
      content,
      targetRange,
      (t + '\n\n')
    );
    setContentState(newContentState);

    const newState = EditorState.push(
      editorState,
      newContentState
    );

    setEditorState(newState);
  }

  function bold() {

    event.preventDefault();
    const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    setEditorState(nextState);
  }

  function italic() {

    event.preventDefault();
    const nextState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    setEditorState(nextState);
  }

  return (
    <div className="Editor">
      <Highlight callback={highlightCallback} />
      <div className="editorContainer" onClick={focusEditor}>
        <ButtonGroup variant="text">
          <Button onMouseDown={() => bold()}>Bold</Button>
          <Button onMouseDown={() => italic()}>Italic</Button>
        </ButtonGroup>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={newEditorState => setEditorState(newEditorState)}
        />
      </div>
    </div>
  );
}