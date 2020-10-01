import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { EditorState, ContentState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box, Dialog, AppBar, TextField, IconButton, Toolbar, Switch, Tooltip } from '@material-ui/core';
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
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import './Editor.css';
import { insertNewBlock, getSelectionParentElement, insertImageUtil } from './EditorUtils';
import saveState from './Saver';

type EditorProps = {
    img: string
    screenshotCallback: (b: boolean) => void
};

export default function TextEditor({ img, screenshotCallback }: EditorProps) {


    const [editorState, setEditor] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    const [style, setStyle] = useState('unstyled');
    // File name in the editor
    const [name, setName] = useState('Unnamed');
    const [fullscreenOpen, setFullscreenOpen] = useState(false);
    const [saveToggle, setSaveToggle] = useState(false);
    const [highlightToggle, setHighlightToggle] = useState(true);
    let prevSelection = null;

    // All the plugins for draft.js
    const imagePlugin = createImagePlugin();
    const plugins = [imagePlugin];

    const handleEditor = useCallback(() => {
        if (window.getSelection().toString().length && window.getSelection().toString() !== prevSelection && highlightToggle &&
            (getSelectionParentElement().className === 'page' || getSelectionParentElement().className === 'textLayer')) {
            const exactText = window.getSelection().toString();
            prevSelection = exactText;
            setEditor(prevEditor => insertNewBlock(prevEditor, exactText, style));
        }
    }, [style, highlightToggle]);

    useEffect(() => {
        setEditor(prevEditor => insertImageUtil(prevEditor, img));
    }, [img]);

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

    function toggleStyle(event, newStyle) {
        event.preventDefault();
        screenshotCallback(newStyle === 'img');
        setStyle(newStyle);

    }

    return (
        <div>
            <Grid container wrap="wrap">
                <AppBar color="transparent" position="static">
                    <Toolbar variant="dense"  style={{ backgroundColor: '#fff' }}>
                        <Box>
                            <Tooltip title="Highlight to Editor" placement="top">
                                <Switch
                                    checked={highlightToggle}
                                    onChange={() => { setHighlightToggle(!highlightToggle); }}
                                    name="Highlight"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </Tooltip>
                        </Box>
                        <Box overflow="hidden">
                            <Tooltip title="Highlight Text Types" placement="top">
                                <ToggleButtonGroup exclusive value={style} onChange={toggleStyle} size="small">
                                    <ToggleButton value="header-two"> <TextFieldsIcon /> </ToggleButton>
                                    <ToggleButton value="header-three"> <TextFieldsIcon fontSize="small" /> </ToggleButton>
                                    <ToggleButton value="unstyled"> <TextFormatIcon /> </ToggleButton>
                                    <ToggleButton value="unordered-list-item"> <FormatListBulletedIcon /> </ToggleButton>
                                    <ToggleButton value="img"> <CameraAltIcon /> </ToggleButton>


                                </ToggleButtonGroup>
                            </Tooltip>
                        </Box>
                        <Box overflow="hidden">
                            <ButtonGroup >
                                <IconButton onMouseDown={() => formatText('BOLD')}><FormatBoldIcon fontSize="small" /></IconButton>
                                <IconButton onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon fontSize="small" /></IconButton>
                                <IconButton onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon fontSize="small" /></IconButton>
                                <IconButton onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon fontSize="small" /></IconButton>
                                <IconButton onMouseDown={() => code()}><CodeIcon fontSize="small" /></IconButton>

                            </ButtonGroup>
                        </Box>
                        <Box overflow="hidden">
                            <IconButton onClick={() => { setSaveToggle(true); }}>
                                <SaveAltIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box overflow="hidden">
                            <Dialog open={saveToggle} onClose={() => { setSaveToggle(false); }}>
                                <Box m={2} overflow="hidden">
                                    <Grid container wrap="wrap" direction="column">
                                        <Grid item xs>
                                            <TextField id="filled-helperText" defaultValue={name} label="File Name"
                                                onChange={(event) => { setName(event.target.value); }} />
                                        </Grid>
                                        <Grid item xs>
                                            <Button onMouseDown={() => saveState(editorState, 'docx', name)}>Save as Word Document</Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button onMouseDown={() => saveState(editorState, 'html', name)}>Save as HTML</Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button onMouseDown={() => saveState(editorState, 'txt', name)}>Save as Text Document</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Dialog>
                        </Box>
                        <Box overflow="hidden">
                            <IconButton onClick={() => { setFullscreenOpen(true); }}>
                                <FullscreenIcon fontSize="small" />
                            </IconButton>
                            <Dialog fullScreen open={fullscreenOpen} onClose={() => { setFullscreenOpen(false); }}>
                                <Paper onClick={focusEditor} elevation={4}>
                                    <Editor
                                        ref={editor}
                                        editorState={editorState}
                                        plugins={plugins}
                                        onChange={setEditor}
                                    />
                                </Paper>
                            </Dialog>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Grid item xs={12} >
                    <Box my={1} mx={2} >
                        <Paper onClick={focusEditor} elevation={4}>
                            <Editor
                                ref={editor}
                                editorState={editorState}
                                plugins={plugins}
                                onChange={setEditor}
                            />
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div >
    );
}