import React, { useState, useRef, useEffect, useCallback, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { EditorState, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
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

import { updateEditor } from '../../redux/actions/filesActions';
import { FilesActionsTypes } from '../../redux/types/filesTypes';
import { AppState } from '../../redux/reducers';

import './Editor.css';
import { insertNewBlock, getSelectionParentElement, insertImageUtil } from './EditorUtils';
import saveState from './Saver';

type EditorProps = {
    img: string
    screenshotCallback: (b: boolean) => void
    dragging: boolean,
    fileUuid: string
};

export default function TextEditor({ img, screenshotCallback, dragging, fileUuid }: EditorProps) {


    const content = useSelector((state: AppState) => state.files[fileUuid].summary);
    const contentDispatch = useDispatch<Dispatch<FilesActionsTypes>>();
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));

    // Update editorstate both in state and in local storage
    const setEditor = (newEditorState: EditorState) => {
        contentDispatch(updateEditor(fileUuid, convertToRaw(editorState.getCurrentContent())));
        setEditorState(newEditorState);
    };

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
            setEditorState((prevState) => {
                const newEditor = insertNewBlock(prevState, exactText, style);
                contentDispatch(updateEditor(fileUuid, convertToRaw(newEditor.getCurrentContent())));
                return newEditor;
            });
        }
    }, [style, highlightToggle]);

    useEffect(() => {
        setEditorState((prevState) => {
            const newEditor = insertImageUtil(prevState, img);
            contentDispatch(updateEditor(fileUuid, convertToRaw(newEditor.getCurrentContent())));
            return newEditor;
        });
    }, [img]);

    function hotKey(e) {
        if (e.keyCode === 49 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+1
            return 'header-one';
        }
        if (e.keyCode === 70 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+f
            return 'full';
        }
        if (e.keyCode === 50 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+2
            return 'header-three';
        }
        if (e.keyCode === 51 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+3
            return 'unstyled';
        }
        if (e.keyCode === 52 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+4
            return 'unordered-list-item';
        }
        if (e.keyCode === 53 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+5
            return 'img';
        }
        if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+s
            return 'save';
        }
        if (e.keyCode === 66 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+b
            return 'bold';
        }
        if (e.keyCode === 73 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+i
            return 'italic';
        }
        if (e.keyCode === 85 && KeyBindingUtil.hasCommandModifier(e)) { // Cmd+u
            return 'underline';
        }
        // adds default pre-made draft.js hotkeys
        return getDefaultKeyBinding(e);
    }

    function handleKey(command) {
        screenshotCallback(false);
        if (command === 'header-one') {
            setStyle('header-two');
            return 'handled';
        }
        if (command === 'full') {
            setFullscreenOpen(true);
            return 'handled';
        }
        if (command === 'save') {
            setSaveToggle(true);
            return 'handled';
        }
        if (command === 'header-three') {
            setStyle('header-three');
            return 'handled';
        }
        if (command === 'unstyled') {
            setStyle('unstyled');
            return 'handled';
        }
        if (command === 'unordered-list-item') {
            setStyle('unordered-list-item');
            return 'handled';
        }
        if (command === 'img') {
            setStyle('img');
            screenshotCallback(true);
            return 'handled';
        }
        if (command === 'bold') {
            formatText('BOLD');
            return 'handled';
        }
        if (command === 'underline') {
            formatText('UNDERLINE');
        }
        if (command === 'italic') {
            formatText('ITALIC');
        }
        return 'not-handled';
    }

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
            <Grid container wrap="wrap">
                <AppBar color="transparent" position="static">
                    <Toolbar variant="dense" style={{ backgroundColor: '#fff' }}>
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
                                        handleKeyCommand={handleKey}
                                        keyBindingFn={hotKey}
                                    />
                                </Paper>
                            </Dialog>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Grid item xs={12} >
                    <Box my={1} mx={2} >
                        <Paper onClick={focusEditor} elevation={4}>
                            {!dragging &&
                                <Editor
                                    ref={editor}
                                    editorState={editorState}
                                    plugins={plugins}
                                    onChange={setEditor}
                                    handleKeyCommand={handleKey}
                                    keyBindingFn={hotKey}
                                />
                            }
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
    );
}
