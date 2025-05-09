import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Grid, Box, Dialog, AppBar, TextField, IconButton, Toolbar, Switch, Tooltip } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import {
    DialogContent, DialogTitle, DialogContentText, DialogActions
} from '@mui/material';

import { updateEditor } from '../../redux/actions/filesActions';
import { AppState } from '../../redux/reducers';
import { saveFile } from '../../redux/asyncActions/fileAsyncActions';
import { updateProjectName } from '../../redux/asyncActions/projectAsyncActions';
import SignUp from '../auth/SignUp';
import { Project } from '../../redux/types/projectTypes';
import {Notes} from '../../redux/types/noteType';

import downloadState from './Download';
import './Editor.css';
import { insertImageUtil, hotKey, insertNewBlock } from '../../utils/EditorUtils';
import {Files} from '../../redux/types/filesTypes';
import {extractNotes} from '../../utils/NotesUtils';

type EditorProps = {
    img: string
    screenshotCallback: (b: boolean) => void
    dragging: boolean,
    fileId: string,
};

export default function TextEditor({ img, screenshotCallback, dragging, fileId}: EditorProps) {

    const filesState: Files = useSelector((state: any) => state.files);
    const notesState: Notes = useSelector((state: any) => state.notes);
    const fileID: number = Number(fileId);

    const { isLoggedIn } = useSelector((state: AppState) => state.auth);
    const userState = useSelector((state: AppState) => state.auth);
    const projectState = useParams<{ id: string }>();

    const project: Project = useSelector((state: any) => state.projects[projectState.id]);

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
    const [name, setName] = useState('Unbenannt');
    const [fullscreenOpen, setFullscreenOpen] = useState(false);
    const [saveToggle, setSaveToggle] = useState(false);
    const [saveToggleOnLeave, setSaveToggleOnLeave] = useState(false);
    const [saveDownload, setDownloadToggle] = useState(false);
    const [saveToggleFile, setSaveToggleFile] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isNewProjectOpen, setNewProjectOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState(project.name);

    const newProject = (name: string) => {
        dispatch(updateProjectName(name, userState.id, projectState.id));
    };



    const [highlightToggle, setHighlightToggle] = useState(true);

    // All the plugins for draft.js
    const imagePlugin = createImagePlugin();
    const plugins = [imagePlugin];

    useEffect(() => {
        if (!isLoggedIn) {
            window.addEventListener('beforeunload', (event) => {
                setSaveToggleOnLeave(true);
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = '';
            });
        }
    });



    useEffect(() => {
        if (isLoggedIn && project.name === 'UNNAMED PROJECT') {
            setShowSignUp(false);
            setNewProjectOpen(true);
        }

    }, [project, isLoggedIn]);

    // If there is a new image insert it to the editor
    useEffect(() => {
        setEditorState((prevState) => insertImageUtil(prevState, img));
    }, [img, isLoggedIn]);

    const [notesStateLength, setNotesStateLength] = useState<number>(Object.keys(notesState).length);

    useEffect(() => {
        const notes: Note[] = extractNotes(filesState, notesState, fileID);
        if (notesStateLength !== notes.length){
            setNotesStateLength(Object.keys(notesState).length);
        }
    }, [notesState]);

    useEffect(() => {
        const notes: Note[] = extractNotes(filesState, notesState, fileID);
        if(highlightToggle){
            let copyPasteText = '';
            const objectLength = Object.keys(notesState).length;
            const notesLength = notes.length;
            if (notesLength > 0 && objectLength > notesStateLength && notes[notesLength - 1].quote) {
                copyPasteText = notes[notesLength - 1].quote;
            }
            if (copyPasteText !== '' && copyPasteText.match(/^ *$/) == null) {
                setEditorState((prevState) => insertNewBlock(prevState, copyPasteText, style));
            }
        }
    }, [notesState, notesStateLength, filesState]);

    const editor = useRef(null);

    function handleKey(command: string) {
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

    // Toggle inline style
    function formatText(nextStyle: string): void {
        if (nextStyle === 'CODE') {
            setEditorState(RichUtils.toggleCode(editorState));
        } else {
            setEditorState(RichUtils.toggleInlineStyle(editorState, nextStyle));
        }
    }

    // Toggle the style in which we capture highlights. Header, text, image...
    function toggleStyle(event, newStyle: string): void {
        event.preventDefault();
        // Call the parent component to tell we want screenshots
        screenshotCallback(newStyle === 'img');
        setStyle(newStyle);
    }

    // Draft editor
    const editorComponent = (
        <Editor ref={editor} editorState={editorState} plugins={plugins}
            onChange={setEditorState} handleKeyCommand={handleKey} keyBindingFn={hotKey} />
    );

    // Pops up when the save button is clicked
    const saveDialog = (
        <Dialog open={saveToggleFile} onClose={() => { setSaveToggleFile(false); }}>
            <Box m={2} overflow="hidden">
                <Grid container wrap="wrap" direction="column">
                    <Grid item xs>
                        <TextField id="filled-basic" label="Name" variant="filled" defaultValue={name} onChange={(e) => { setName(e.target.value); }} />
                    </Grid>
                    <Grid item xs>
                        <Button onMouseDown={() => downloadState(editorState, 'pdf', name)}>PDF Dokument (.pdf)</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onMouseDown={() => downloadState(editorState, 'docx', name)}>Microsoft Word (.docx)</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onMouseDown={() => downloadState(editorState, 'html', name)}>Webseite (.html)</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onMouseDown={() => downloadState(editorState, 'md', name)}>Markdown (.md)</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onMouseDown={() => downloadState(editorState, 'txt', name)}>Einfacher Text (.txt)</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );

    const benefitsDialogs = (

        <Dialog onClose={() => setSaveToggle(false)} aria-labelledby="customized-dialog-title" open={saveToggle}>
            <DialogTitle id="alert-dialog-title">
                Do You Want To Sign Up?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Signing up enables you to continue your work and upload multiple PDFs
                    to summarize. It also enables Auto-save, so that no progress
                    will be lost if you leave CosmoNote
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setSaveToggle(false); setSaveToggleFile(true); }}>Just Download</Button>
                <Button onClick={() => { setSaveToggle(false); setShowSignUp(true); }}>
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );


    const benefitsDialogsOnLeave = (
        <Dialog onClose={() => setSaveToggleOnLeave(false)} aria-labelledby="customized-dialog-title" open={saveToggleOnLeave}>
            <DialogTitle id="alert-dialog-title">
                Do You Want To Sign Up?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Signing up enables you to continue your work and upload multiple PDFs
                    to summarize. It also enables Auto-save, so that no progress
                    will be lost if you leave CosmoNote
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setSaveToggleOnLeave(false); setDownloadToggle(true); }}>No</Button>
                <Button onClick={() => { setSaveToggleOnLeave(false); setShowSignUp(true); }}>
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );

    const downloadDialogs = (

        <Dialog onClose={() => setDownloadToggle(false)} aria-labelledby="customized-dialog-title" open={saveDownload}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Remember to download your file as all progress
                    will be lost if you close this site.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setDownloadToggle(false);
                    setSaveToggleFile(true);
                }
                }>OK</Button>
            </DialogActions>
        </Dialog>
    );


    const signUpDialogs = (
        <Dialog onClose={() => setShowSignUp(false)} aria-labelledby="customized-dialog-title" open={showSignUp}>
            <SignUp />
        </Dialog>

    );

    // The toolbar with all the buttons
    const toolbar = (
        <AppBar color="transparent" position="static" style={{ overflow: 'auto' }}>
            <Toolbar variant="dense">
                <Tooltip title="Highlight to Editor from PDF" placement="top">
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
                <ButtonGroup style={{
                    paddingLeft: 10
                }}>
                    <Button onMouseDown={() => formatText('BOLD')} className="editorButton"><FormatBoldIcon fontSize="small" /></Button>
                    <Button onMouseDown={() => formatText('ITALIC')} className="editorButton"><FormatItalicIcon fontSize="small" /></Button>
                    <Button onMouseDown={() => formatText('STRIKETHROUGH')} className="editorButton"><FormatStrikethroughIcon fontSize="small" /></Button>
                    <Button onMouseDown={() => formatText('UNDERLINE')} className="editorButton"><FormatUnderlinedIcon fontSize="small" /></Button>
                    <Button onMouseDown={() => formatText('CODE')} className="editorButton"><CodeIcon fontSize="small" /></Button>
                </ButtonGroup>
                <Tooltip title="Exportieren" placement="top">
                    {/*isLoggedIn
                      ? <IconButton
                          onClick={() => { setSaveToggleFile(true); }}
                          style={{ marginLeft: 'auto' }} size="large">
                          <SaveAltIcon fontSize="small" />
                        </IconButton>
                      : <IconButton
                          onClick={() => { setSaveToggle(true); }}
                          style={{ marginLeft: 'auto' }} size="large">
                          <SaveAltIcon fontSize="small" />
                       </IconButton>
                    */}
                    <IconButton
                      onClick={() => { setSaveToggle(false); setSaveToggleFile(true); }}
                      style={{ marginLeft: 'auto' }} size="large">
                      <SaveAltIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title={file.needsSave ? 'Save work to cloud' : 'Work already saved to cloud'} placement="top">
                    <IconButton
                        onClick={() => dispatch(saveFile(fileId))}
                        style={file.needsSave ? { color: '#000' } : {}}
                        size="large">
                        <SaveIcon fontSize="small" />
                    </IconButton>
                </Tooltip>*/}
            </Toolbar>
        </AppBar>
    );

    // Editor but in full screen, using a dialog
    // TODO: make more proper
    const editorFull = (
        <Dialog fullScreen open={fullscreenOpen} onClose={() => { setFullscreenOpen(false); }}>
            {toolbar}
            {editorComponent}
        </Dialog>
    );

    const SetProjectName = (
        <Dialog fullWidth={true} maxWidth="sm" open={isNewProjectOpen} onClose={() => setNewProjectOpen(false)}>
            <Box m={1}>
                <DialogTitle>Set Project Name</DialogTitle>
                <DialogContent>
                    <Box style={{ display: 'flex' }} m={0}>
                        <TextField label="Project name" value={newProjectName} onChange={e => { setNewProjectName(e.target.value); }} />
                        <DialogActions disableSpacing={true} style={{ marginLeft: 'auto' }}>
                            <Button variant="contained" color="primary"
                                onClick={() => { newProject(newProjectName); setNewProjectOpen(false); }}>Update</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );

    return (
        <>
            <Box flexDirection="column" display="flex" width="100%" height="100%" >
                {toolbar}

                <Box flexGrow={1} style={{
                    minHeight: '0',
                    backgroundColor: '#fff',
                    overflow: 'auto'
                }}>
                    {!dragging && !fullscreenOpen && editorComponent}
                </Box>
            </Box>
            {editorFull}
            {saveDialog}
            {/* {benefitsDialogs} */}
            {/* {signUpDialogs} */}
            {SetProjectName}
            {downloadDialogs}
            {/* {benefitsDialogsOnLeave} */}
        </>
    );
}
