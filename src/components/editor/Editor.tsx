import React, { useState } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import CodeIcon from '@material-ui/icons/Code';
import { convertToRaw } from 'draft-js';


import './Editor.css';


export default function TextEditor() {

  var editorState = EditorState.createWithContent(ContentState.createFromText(''));

  const [eState, setEState] = useState(EditorState.createWithContent(ContentState.createFromText('sdfgsdfg')));

  function getEditor(): EditorState { 
    return editorState;
  }

  function setEditor(es: EditorState) {
    console.log('here')
     editorState = es; 
     setEState(es);
    }

  function updateEditor(){
    editorState = eState;
  }
    

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
    document.addEventListener('mouseup', hlight);
  }, [getEditor()]);

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

  function hlight() {
    if (window.getSelection().toString().length) {
      const exactText = window.getSelection().toString();
      addText(exactText);
    }
  }

  function addText(toInsert) {
    const currentContent = getEditor().getCurrentContent();
    const currentSelection = getEditor().getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      '\n' + toInsert + '\n'
    );

    setEditor(EditorState.push(getEditor(), newContent));

  }

  function formatText(f) {
    const nextState = RichUtils.toggleInlineStyle(getEditor(), f);
    setEditor(nextState);
  }

  function code() {
    const nextState = RichUtils.toggleCode(getEditor());
    setEditor(nextState);
  }

  function saveState() {
    const save = convertToRaw(getEditor().getCurrentContent());
    console.log(save);
  }

  return (
    <div>
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
                editorState={eState}
                onChange={setEditor}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
}