import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import CodeIcon from '@material-ui/icons/Code';
import { convertFromRaw, convertToRaw } from 'draft-js';


import './Editor.css';
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


  const styleMap = {
    'H1': {
      fontSize: '1.8em'
    },
    'H2': {
      fontSize: '1.4em'
    },
    'H3': {
      fontSize: '1.2em'
    },
  };



  function addText(toInsert) {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();


    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      '\n' + toInsert + '\n'
    );

    setEditorState(EditorState.push(editorState, newContent));

  }

  function formatText(f) {
    const nextState = RichUtils.toggleInlineStyle(editorState, f);
    setEditorState(nextState);
  }

  function code() {
    const nextState = RichUtils.toggleCode(editorState);
    setEditorState(nextState);
  }

  function saveState() {
    const save = convertToRaw(editorState.getCurrentContent());
    console.log(save);
  }

  return (
    <div>
      <Highlight callback={addText} />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box mx={1} overflow="hidden">
            <Paper elevation={0}>
              <ButtonGroup className="ButtonGroup">
                <Button onMouseDown={() => formatText('BOLD')}><FormatBoldIcon /></Button>
                <Button onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon /></Button>
                <Button onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon /></Button>
                <Button onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon /></Button>
                <Button onMouseDown={() => code()}><CodeIcon /></Button>
                <Button onMouseDown={() => formatText('H1')}>H1</Button>
                <Button onMouseDown={() => formatText('H2')}>H2</Button>
                <Button onMouseDown={() => formatText('H3')}>H3</Button>
                <Button onMouseDown={() => saveState()}>S</Button>

              </ButtonGroup>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1}>
            <Paper onClick={focusEditor} elevation={4}>
              <Editor
                ref={editor}
                customStyleMap={styleMap}
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