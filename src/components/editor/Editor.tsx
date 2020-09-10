import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';


import Highlight from './Highlight';
import './Editor.css';


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

  function code() {

    event.preventDefault();
    const nextState = RichUtils.toggleCode(editorState);
    setEditorState(nextState);
  }




  return (
    <div>
      <Highlight callback={highlightCallback} />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box mx={1}>
            <Paper elevation={0}>
              <ButtonGroup className="ButtonGroup">
                <Button className="Button" onMouseDown={() => formatText('BOLD')}><FormatBoldIcon /></Button>
                <Button onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon /></Button>
                <Button onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon /></Button>
                <Button onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon /></Button>
              </ButtonGroup>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1}>
            <Paper onClick={focusEditor} elevation={4}>
              <Editor
                ref={editor}
                editorState={editorState}
                onChange={newEditorState => setEditorState(newEditorState)}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
}