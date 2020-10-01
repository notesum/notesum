import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';

export default function MainView() {

    const [screenshot, setScreenshot] = useState(false);

    return (
        <Box flexDirection="row" display="flex" height="100%">
            <Button onClick={() => setScreenshot((curr) => !curr)}>{screenshot ? "screenshot on" : "screenshot off"}</Button>
            <Box flexGrow={1} style={{
                minWidth: '50%', // Later on this size will be more dynamic and 'draggable' by the user.
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} screenshot={screenshot} screenshotCallback={(img) => console.log(img)} hidden={false} fitToWidth={false}/>
            </Box>
            <Box flexGrow={1} style={{
                minWidth: '50%',
                overflow: 'auto',
                height: '100%'
            }}>
                <TextEditor/>
            </Box>
        </Box>
    );
}