import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List,
    ListItem, ListItemText, ListSubheader, InputBase, makeStyles, Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Project } from '../../redux/types/projectTypes';
import { Files } from '../../redux/types/filesTypes';
import { AppState } from '../../redux/reducers';
import { createFile, loadFiles } from '../../redux/asyncActions/fileAsyncActions';
import Error from '../Error';
import Login from '../auth/Login';

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

    // Check if the user is logged in
    const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        return (<>
            <Login warning={true} />
        </>);
    }

    // Project wasn't found, return 404
    if (!project) return (<Error />);

    useEffect(() => {
        dispatch(loadFiles());
    }, []);

    const [currentFile, setCurrentFile] = useState<string>(
        project.files.length === 0 || !(project.files[0] in files) ? null : project.files[0]);

    const addProjectFile = (title: string, pdf: File) => {
        dispatch(createFile(id, title, pdf));
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
                                setCurrentFile(fileId);
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
                    {currentFile ? <>
                        <DocumentView pdf={{ data: files[currentFile].pdf }} fileId={currentFile} />
                    </> : <>
                            <EmptyProject addFile={addProjectFile} />
                        </>}
                </Box>
            </Box>
        </>
    );
}