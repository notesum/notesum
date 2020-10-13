import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Grid, Box, Dialog, AppBar, TextField, IconButton, Toolbar, Switch, Tooltip } from '@material-ui/core';
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
import SaveIcon from '@material-ui/icons/Save';

import { AppState } from '../../redux/reducers';
import { updateEditor } from '../../redux/actions/filesActions';
import { saveFile } from '../../redux/asyncActions/fileAsyncActions';

import './Editor.css';
import { insertNewBlock, getSelectionParentElement, insertImageUtil, hotKey } from './EditorUtils';
import saveState from './Saver';

type EditorProps = {
    img: string
    screenshotCallback: (b: boolean) => void
    dragging: boolean,
    fileId: string
};

export default function TextEditor({ img, screenshotCallback, dragging, fileId }: EditorProps) {

    const content = useSelector((state: AppState) => state.files[fileId].summary);
    const file = useSelector((state: AppState) => state.files[fileId]);
    const dispatch = useDispatch();

    // Main data structure for the draft js editor
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));

    // Update redux with the editor changes
    useEffect(() => {
        dispatch(updateEditor(fileId, convertToRaw(editorState.getCurrentContent())));
    }, [editorState]);

    // Current used text style, bold, italic ...
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

    // Called everytime there is a higlight
    const handleEditor = useCallback(() => {
        if (window.getSelection().toString().length && window.getSelection().toString() !== prevSelection && highlightToggle &&
            (getSelectionParentElement().className === 'page' || getSelectionParentElement().className === 'textLayer')) {
            const exactText = window.getSelection().toString();
            prevSelection = exactText;
            setEditorState((prevState) => insertNewBlock(prevState, exactText, style));
        }
    }, [style, highlightToggle]);

    // If there is a new image insert it to the editor
    useEffect(() => {
        setEditorState((prevState) => insertImageUtil(prevState, img));
    }, [img]);

    // Listen to mouseup for highlight behaviour
    useEffect(() => {
        focusEditor();
        window.addEventListener('mouseup', handleEditor);
        return () => {
            window.removeEventListener('mouseup', handleEditor);
        };
    }, []);


    function handleKey(command) {
        screenshotCallback(false);
        if (command === 'header-one') {
            setStyle('header-two');
        }
        else if (command === 'full') {
            setFullscreenOpen(true);
        }
        else if (command === 'save') {
            setSaveToggle(true);
        }
        else if (command === 'header-three') {
            setStyle('header-three');
        }
        else if (command === 'unstyled') {
            setStyle('unstyled');
        }
        else if (command === 'unordered-list-item') {
            setStyle('unordered-list-item');
        }
        else if (command === 'img') {
            setStyle('img');
            screenshotCallback(true);
        }
        else if (command === 'bold') {
            formatText('BOLD');
        }
        else if (command === 'underline') {
            formatText('UNDERLINE');
        }
        else if (command === 'italic') {
            formatText('ITALIC');
        } else {
            return 'not-handled';
        }
        return 'handled';
    }



    const editor = useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    function formatText(f) {
        const nextState = RichUtils.toggleInlineStyle(editorState, f);
        setEditorState(nextState);
    }

    function code() {
        const nextState = RichUtils.toggleCode(editorState);
        setEditorState(nextState);
    }

    function toggleStyle(event, newStyle) {
        event.preventDefault();
        screenshotCallback(newStyle === 'img');
        setStyle(newStyle);
    }

    const editorComponent =
        <Editor ref={editor} editorState={editorState} plugins={plugins}
            onChange={setEditorState} handleKeyCommand={handleKey} keyBindingFn={hotKey} />;

    const saveDialog =
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
        </Dialog>;

    const toolbar =
        <AppBar color="transparent" position="static" style={{ overflow: 'auto' }}>
            <Toolbar variant="dense">
                <Tooltip title="Highlight to Editor" placement="top">
                    <Switch
                        checked={highlightToggle}
                        onChange={() => { setHighlightToggle(!highlightToggle); }}
                        name="Highlight"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }} />
                </Tooltip>
                <Tooltip title="Highlight Text Types" placement="top">
                    <ToggleButtonGroup exclusive value={style} onChange={toggleStyle} size="small">
                        <ToggleButton value="header-two"> <TextFieldsIcon /> </ToggleButton>
                        <ToggleButton value="header-three"> <TextFieldsIcon fontSize="small" /> </ToggleButton>
                        <ToggleButton value="unstyled"> <TextFormatIcon /> </ToggleButton>
                        <ToggleButton value="unordered-list-item"> <FormatListBulletedIcon /> </ToggleButton>
                        <ToggleButton value="img"> <CameraAltIcon /> </ToggleButton>
                    </ToggleButtonGroup>
                </Tooltip>
                <ButtonGroup >
                    <IconButton onMouseDown={() => formatText('BOLD')}><FormatBoldIcon fontSize="small" /></IconButton>
                    <IconButton onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon fontSize="small" /></IconButton>
                    <IconButton onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon fontSize="small" /></IconButton>
                    <IconButton onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon fontSize="small" /></IconButton>
                    <IconButton onMouseDown={() => code()}><CodeIcon fontSize="small" /></IconButton>
                </ButtonGroup>
                <IconButton onClick={() => { setSaveToggle(true); }} style={{ marginLeft: 'auto' }}>
                    <SaveAltIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => dispatch(saveFile(fileId))} style={file.needsSave ? { color: '#000' } : {}}>
                    <SaveIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => { setFullscreenOpen(true); }}>
                    <FullscreenIcon fontSize="small" />
                </IconButton>
            </Toolbar>
        </AppBar>;


    const editorFull =
        <Dialog fullScreen open={fullscreenOpen} onClose={() => { setFullscreenOpen(false); }}>
            {toolbar}
            {editorComponent}
        </Dialog>;


    // Main design
    return (
        <div style={{ backgroundColor: 'white' }} >
            <Grid container wrap="wrap">
                {toolbar}
                <Grid item xs={12} style={{ backgroundColor: 'white' }}>
                    {!dragging && !fullscreenOpen && editorComponent
                    }
                </Grid>
            </Grid>
            {/* The dialogs */}
            {editorFull}
            {saveDialog}
        </div >
    );
}