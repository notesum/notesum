import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import './Editor.css';
import { insertNewBlock, getSelectionParentElement } from './EditorUtils';
import saveState from './Saver';

export default function TextEditor() {

    const [editorState, setEditor] = useState(EditorState.createWithContent(ContentState.createFromText('')));
    const [style, setStyle] = useState('unstyled');
    let prevSelection = null;

    const handleEditor = useCallback(() => {
        if (window.getSelection().toString().length && window.getSelection().toString() !== prevSelection &&
            (getSelectionParentElement().className === 'page' || getSelectionParentElement().className === 'textLayer')) {
            const exactText = window.getSelection().toString();
            prevSelection = exactText;
            setEditor(prevEditor => insertNewBlock(prevEditor, exactText, style));
        }
    }, [style]);

    useEffect(() => {
        focusEditor();
        // Listen to mouseup for highlight behaviour
        window.addEventListener('mouseup', handleEditor);

        return () => {
            window.removeEventListener('mouseup', handleEditor);
        };
    }, [handleEditor, style]);

    const editor = useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    function formatText(f) {
        const nextState = RichUtils.toggleInlineStyle(editorState, f);
        setEditor(nextState);
    }

    function code() {
        const nextState = RichUtils.toggleCode(editorState);
        setEditor(nextState);
    }

    function testButton() {
        const blocks = editorState.getCurrentContent().getBlockMap();
        // console.log(blocks);
        for (const block of blocks) {
            const entry = block[1];
            if (entry.getText().length > 0) {
                console.log(entry.getType(), entry.getText());
            }
        }
    }

    function toggleStyle(event, newStyle) {
        event.preventDefault();
        setStyle(newStyle);
    }

    return (
        <div>
            <Grid container wrap='wrap'>
                <Grid item xs>
                    <Box mx={1} overflow="hidden">
                        <ToggleButtonGroup exclusive value={style} onChange={toggleStyle} size="small">
                            <ToggleButton value="header-two"> <TextFieldsIcon /> </ToggleButton>
                            <ToggleButton value="header-three"> <TextFieldsIcon fontSize="small" /> </ToggleButton>
                            <ToggleButton value="unstyled"> <TextFormatIcon /> </ToggleButton>
                            <ToggleButton value="unordered-list-item"> <FormatListBulletedIcon /> </ToggleButton>

                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box mx={1} overflow="hidden">
                        <ButtonGroup >
                            <Button onMouseDown={() => formatText('BOLD')}><FormatBoldIcon /></Button>
                            <Button onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon /></Button>
                            <Button onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon /></Button>
                            <Button onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon /></Button>
                            <Button onMouseDown={() => code()}><CodeIcon /></Button>
                            <Button onMouseDown={() => saveState(editorState, 'html')}><SaveAltIcon /></Button>
                            <Button onMouseDown={() => testButton()}>Test</Button>

                        </ButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box m={1}>
                        <Paper onClick={focusEditor} elevation={4}>
                            <Editor
                                ref={editor}
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