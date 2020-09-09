import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid } from '@material-ui/core';

import Highlight from './Highlight';
import "./Editor.css";


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

  function formatText(f) {

    event.preventDefault();
    const nextState = RichUtils.toggleInlineStyle(editorState, f);
    setEditorState(nextState);
  }



  return (
    <div>
      <Highlight callback={highlightCallback} />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ButtonGroup variant="text">
            <Button onMouseDown={() => formatText('BOLD')}>Bold</Button>
            <Button onMouseDown={() => formatText('ITALIC')}>Italic</Button>
            <Button onMouseDown={() => formatText('STRIKETHROUGH')}>Strikethrough</Button>
            <Button onMouseDown={() => formatText('UNDERLINE')}>Underline</Button>

          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Paper onClick={focusEditor} elevation={4}>
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={newEditorState => setEditorState(newEditorState)}
            />
          </Paper>
        </Grid>
      </Grid>
    </div >
  );
}