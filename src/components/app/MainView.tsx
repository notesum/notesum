import React from 'react';
import { Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';

export default function MainView() {
    return (
        <Box flexDirection="row" display="flex" height="100%">
            <Box flexGrow={1} style={{
                minWidth: '50%', // Later on this size will be more dynamic and 'draggable' by the user.
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} hidden={false} fitToWidth={false}/>
            </Box>
            <Box flexGrow={1} style={{
                minWidth: '50%',
                overflow: 'hidden',
                height: '100%'
            }}>
                <TextEditor/>
            </Box>
        </Box>
    );
}