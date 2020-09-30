import React from 'react';
import { Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';
import './MainView.css';
import React from 'react';

export default function MainView() {

    const [pers, setPers] = React.useState(50);
    const [dragging, setDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState(null);


    function getPdf() { return pers.toString() + '%' }
    function getEditor() { return (99 - pers).toString() + '%' }
    function clearSelection() { if (window.getSelection) { window.getSelection().removeAllRanges(); } }

    function startDrag(event) {
        clearSelection();
        setDragging(true);
        setDragStart(event.clientX);
    }

    return (
        <Box flexDirection="row" display="flex" height="100%">
            <Box flexGrow={1} style={{
                // width: ('calc(100% - ${pers}%)'),
                width: getPdf(),
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} hidden={false} fitToWidth={false} />
            </Box>

            <div
                onMouseDown={(e) => startDrag(e)}

                className="resizer"></div>

            <Box flexGrow={1} style={{
                // width: 'calc(${pers}%)',
                width: getEditor(),
                overflow: 'hidden',
                height: '100%'
            }}>
                <TextEditor />
            </Box>
        </Box>
    );
}