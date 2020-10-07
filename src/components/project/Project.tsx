import React, { useState, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List,
    ListItem, ListItemText, ListSubheader, Paper, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { ProjectsState, ProjectsActionTypes } from '../../redux/types/projectsTypes';
import { FilesActionsTypes } from '../../redux/types/filesTypes';
import { newFile } from '../../redux/actions/filesActions';
import { addFileToProject } from '../../redux/actions/projectsActions';
import Error from '../Error';

import EmptyProject from './EmptyProject';
import DocumentView from './DocumentView';

const useStyles = makeStyles(() => ({
    nameBox: {
        padding: '2px 8px',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
        minWidth: '0',
    },
    name: {
        marginBottom: '-5px',
        width: 'auto',
    },
    grow: {
        flexGrow: 1
    }
}));

export default function Project() {

    const { uuid } = useParams<{uuid: string}>();

    const project = useSelector((state: ProjectsState) => state.projects[uuid]);
    const files = useSelector((state: ProjectsState) => state.files);

    const projectsDispatch = useDispatch<Dispatch<ProjectsActionTypes>>();
    const filesDispatch = useDispatch<Dispatch<FilesActionsTypes>>();

    // Project wasn't found, return 404
    if (!project) return (<Error />);

    const [currentFile, setCurrentFile] = useState<string>(project.files.length === 0 ? null : project.files[0]);

    const addProjectFile = (name: string, pdf: Int8Array) => {

        // Create file
        const newFileAction = newFile(name, pdf);
        filesDispatch(newFileAction);

        // Add file to project
        projectsDispatch(addFileToProject(project.uuid, newFileAction.payload.uuid));

        if (!currentFile) {
            setCurrentFile(newFileAction.payload.uuid);
        }
    };

    const [isFileDrawerOpen, setFileDrawerOpen] = useState(false);
    const [isAddFilesModalOpen, setAddFilesModalOpen] = useState(false);

    const classes = useStyles();

    return (
        <>
            <Drawer anchor="left" open={isFileDrawerOpen} onClose={() => setFileDrawerOpen(false)}>
                <List component="nav"
                    subheader={
                        <ListSubheader component="div">
                            Project files
                        </ListSubheader>
                    } style={{ minWidth: '300px' }} >

                    {project.files.map((fileUuid: string) => {
                        return (
                            <ListItem key={fileUuid} button onClick={() => {
                                setCurrentFile(fileUuid);
                                setFileDrawerOpen(false);
                            }} selected={fileUuid===currentFile}>
                                <ListItemText primary={files[fileUuid].name} />
                            </ListItem>);
                    })}
                </List>
                <Button onClick={() => setAddFilesModalOpen(true)}>Add new files</Button>
            </Drawer>

            <Dialog onClose={() => setAddFilesModalOpen(false)} aria-labelledby="customized-dialog-title" open={isAddFilesModalOpen}>
                <DialogTitle>Add files to your project</DialogTitle>
                <DialogContent dividers>
                    <EmptyProject addFile={addProjectFile} />
                </DialogContent>
            </Dialog>

            <Box flexDirection="column" display="flex" height="100%">
                <Box m={0} bgcolor="#2f3d88">
                    <Toolbar variant="dense" style={{padding: 0}}>
                        <IconButton onClick={() => setFileDrawerOpen(true)}><MenuIcon style={{ color: '#fff' }}/></IconButton>
                        <Paper elevation={2} className={classes.nameBox}>
                            <InputBase
                                value={project.name}
                                className={classes.name}
                                onChange={e => { console.log(e.target.value); }}
                                disabled />
                        </Paper>
                    </Toolbar>
                </Box>

                <Box flexGrow={1} style={{
                    minHeight: '0'
                }}>
                    {currentFile ? <>
                        <DocumentView pdf={{ data: files[currentFile].pdfUrl }} fileUuid={currentFile} />
                    </> : <>
                        <EmptyProject addFile={addProjectFile} />
                    </>}
                </Box>
            </Box>
        </>
    );
}