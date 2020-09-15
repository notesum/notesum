import React, { useState, useRef, useEffect, useCallback } from 'react';
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

  const [editorState, setEditor] = useState(EditorState.createWithContent(ContentState.createFromText('')));

  // The callback function for the highlight event handler
  // TODO find a way to abstract this to another file so Highligh can have more functions
  const handleEditor = useCallback(event => {
    event.preventDefault();
    if (window.getSelection().toString().length && getSelectionParentElement().className === 'textLayer') {
      const exactText = window.getSelection().toString();

      setEditor(prevEditor => EditorState.push(prevEditor,
        Modifier.replaceText(
          prevEditor.getCurrentContent(),
          prevEditor.getSelection(),
          '\n' + exactText + '\n'
        )));
    }
  }, []);

  useEffect(() => {
    focusEditor();
    // Listen to mouseup for highlight behaviour
    window.addEventListener('mouseup', handleEditor);

    return () => {
      window.removeEventListener('mouseup', handleEditor);
    };
  }, [handleEditor]);

  // Get the parent element of the selection by also grouping all the parent elements
  // TODO not use copy pasta from the internet
  function getSelectionParentElement() {
    let parentEl = null;
    let sel = null;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        parentEl = sel.getRangeAt(0).commonAncestorContainer;
        if (parentEl.nodeType !== 1) {
          parentEl = parentEl.parentNode;
        }
      }
    } else if ((sel === document.getSelection()) && sel.type !== 'Control') {
      parentEl = sel.createRange().parentElement();
    }
    return parentEl;
  }

  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

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

  function formatText(f) {
    const nextState = RichUtils.toggleInlineStyle(editorState, f);
    setEditor(nextState);
  }

  function code() {
    const nextState = RichUtils.toggleCode(editorState);
    setEditor(nextState);
  }

  function saveState() {
    const save = convertToRaw(editorState.getCurrentContent());
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
                editorState={editorState}
                onChange={setEditor}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
}