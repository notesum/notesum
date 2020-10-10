import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List,
    ListItem, ListItemText, ListSubheader, InputBase, makeStyles, Toolbar, CircularProgress
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Project } from '../../redux/types/projectTypes';
import { Files } from '../../redux/types/filesTypes';
import { createFile, loadFiles, saveFile } from '../../redux/asyncActions/fileAsyncActions';
import { BASE_URL } from '../../redux/asyncActions/ServerSettings';
import { loadProjects } from '../../redux/asyncActions/projectAsyncActions';
import { setCurrentFile } from '../../redux/actions/projectActions';
import Error from '../Error';

import EmptyProject from './EmptyProject';
import DocumentView from './DocumentView';

const useStyles = makeStyles(() => ({
    name: {
        marginBottom: '-5px',
        width: 'auto',
        color: 'white',
        fontWeight: 'bold'
    },
    grow: {
        flexGrow: 1
    }
}));

export default function Project() {

    const { id } = useParams<{ id: string }>();

    const project: Project = useSelector((state: any) => state.projects[id]);
    const files: Files = useSelector((state: any) => state.files);

    const dispatch = useDispatch();

    const authToken = useSelector((state: any) => state.auth.token);

    // Project wasn't found, return 404
    if (!project) return (<Error />);

    // Update project & files list
    useEffect(() => {
        dispatch(loadProjects());
        dispatch(loadFiles());
    }, []);

    const currentFile = project.currentOpenFile;

    useEffect(() => {
        if (!currentFile && project.files.length > 0) {
            dispatch(setCurrentFile(id, project.files[0]));
        }
    }, [project.files]);

    // On unmount, save file
    useEffect(() => {
        return () => {
            if (currentFile) dispatch(saveFile(currentFile));
        };
    }, [currentFile]);

    const addProjectFile = (pdf: File) => {
        dispatch(createFile(id, pdf));
    };

    const [isFileDrawerOpen, setFileDrawerOpen] = useState(false);
    const [isAddFilesModalOpen, setAddFilesModalOpen] = useState(false);

    const classes = useStyles();

    return (
        <>
            <Drawer anchor="left" open={isFileDrawerOpen} onClose={() => setFileDrawerOpen(false)}>
                <List component="nav"
                    subheader={
                        <ListSubheader color="primary" component="div" style={{ fontWeight: 'bold' }}>
                            Project files
                        </ListSubheader>
                    } style={{ minWidth: '300px', maxWidth: '500px' }} >

                    {project.files.map((fileId: string) => {
                        if (!(fileId in files)) return;

                        return (
                            <ListItem key={fileId} button onClick={() => {
                                dispatch(setCurrentFile(id, fileId));
                                setFileDrawerOpen(false);
                            }} selected={fileId === currentFile}>
                                <ListItemText primary={files[fileId].title} />
                            </ListItem>);
                    })}
                </List>
                <Button onClick={() => setAddFilesModalOpen(true)}>Add new files</Button>
                <Button href="/projects"> <ArrowBackIcon fontSize="small" color="primary" />Back to Projects</Button>

            </Drawer>

            <Dialog onClose={() => setAddFilesModalOpen(false)} aria-labelledby="customized-dialog-title" open={isAddFilesModalOpen}>
                <DialogTitle>Add files to your project</DialogTitle>
                <DialogContent dividers>
                    <EmptyProject addFile={addProjectFile} />
                </DialogContent>
            </Dialog>

            <Box flexDirection="column" display="flex" height="100%">
                <Box m={0} bgcolor="#2f3d88">
                    <Toolbar variant="dense" style={{ padding: 0 }}>
                        <IconButton onClick={() => setFileDrawerOpen(true)}><MenuIcon style={{ color: '#fff' }} /></IconButton>
                        <InputBase
                            value={project.name}
                            className={classes.name}
                            onChange={e => { console.log(e.target.value); }} />
                    </Toolbar>
                </Box>

                <Box flexGrow={1} style={{
                    minHeight: '0'
                }}>
                    {currentFile && currentFile in files ?
                    <>
                        <DocumentView pdf={`${BASE_URL}${files[currentFile].pdf}?token=${authToken}`} fileId={currentFile} />
                    </> : (currentFile ?
                    <>
                        <div style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '200px',
                            width: '40px',
                        }}>
                            <CircularProgress/>
                        </div>
                    </> :
                    <>
                        <EmptyProject addFile={addProjectFile} />
                    </>)}
                </Box>
            </Box>
        </>
    );
}