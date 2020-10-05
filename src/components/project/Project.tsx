import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';

import EmptyProject from './EmptyProject';
import DocumentView from './DocumentView';

// type ProjectState = {
//     name: string
// };

export default function Project() {

    // const [file, setFile] = useState<Int8Array>(null);

    // TODO Redux.
    // const [projectState, setProjectState] = useState<ProjectState>({
    //     name: 'Hello World!',
    // });

    const [files, setFiles] = useState<{
        [name: string]: { // Probably later will be some kind of uuid
            name: string,
            pdf: Int8Array,
            documentId: string
        }
    }>({});

    const [currentFile, setCurrentFile] = useState<string>(null);

    const addProjectFile = (name: string, file: Int8Array) => {
        setFiles((cur) => { return { ...cur, [name]: { name, pdf: file, documentId: name }}; });

        if (!currentFile) {
            setCurrentFile(name);
        }
    };

    const [isFileDrawerOpen, setFileDrawerOpen] = useState(false);
    const [isAddFilesModalOpen, setAddFilesModalOpen] = useState(false);

    return (
        <>
            <Drawer anchor="left" open={isFileDrawerOpen} onClose={() => setFileDrawerOpen(false)}>
                <List component="nav" aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Project files
                        </ListSubheader>
                    } style={{ minWidth: '300px' }} >

                    {Object.keys(files).map((name, id) => {
                        return (<ListItem key={id} button onClick={() => {
                            console.log(name);
                            setCurrentFile(name);
                        }}>
                            <ListItemText primary={name} />
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
                <Box m={0} bgcolor="primary.main">
                    <IconButton onClick={() => setFileDrawerOpen(true)}><MenuIcon style={{ color: '#fff' }}/></IconButton>

                    <IconButton href="/"><HomeIcon style={{color: '#fff'}} fontSize="small"/></IconButton >
                    <IconButton href="/about"><InfoIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
                    <IconButton href="/project"><PictureAsPdfIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
                </Box>

                <Box flexGrow={1} style={{
                    minHeight: '0'
                }}>
                    {Object.keys(files).length !== 0 && currentFile ? <>
                        <DocumentView pdf={{ data: files[currentFile].pdf }} documentId={files[currentFile].documentId} />
                    </> : <>
                        <EmptyProject addFile={addProjectFile} />
                    </>}
                </Box>
            </Box>
        </>
    );
}