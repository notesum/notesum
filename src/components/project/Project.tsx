import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import { EditorState } from 'draft-js';

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
            editor: EditorState
        }
    }>({});

    const [currentFile, setCurrentFile] = useState<string>(null);

    const addProjectFile = (name: string, file: Int8Array) => {
        setFiles((cur) => { return { ...cur, [name]: { name, pdf: file, editor: EditorState.createEmpty() }}; });

        if (!currentFile) {
            setCurrentFile(name);
        }
    };

    const updateEditorState = (name: string, newState: EditorState) => {
        setFiles((cur) => { return { ...cur, [name]: { ...cur[name], editor: newState } }; });
    };

    return (
        <Box flexDirection="column" display="flex" height="100%">
            <Box m={0} bgcolor="primary.main">
                <IconButton href="/"><HomeIcon style={{color: '#fff'}} fontSize="small"/></IconButton >
                <IconButton href="/about"><InfoIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
                <IconButton href="/project"><PictureAsPdfIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
            </Box>

            <Box flexGrow={1} style={{
                minHeight: '0'
            }}>
                {Object.keys(files).length !== 0 && currentFile ? <>
                    <DocumentView pdf={{ data: files[currentFile].pdf }} editorState={files[currentFile].editor}
                                  updateEditorState={(newState) => updateEditorState(currentFile, newState)} />
                </> : <>
                    <EmptyProject addFile={addProjectFile} />
                </>}
            </Box>
        </Box>
    );
}