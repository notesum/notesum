import React from 'react';
import { Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';

import './MainView.css';

export default function MainView() {

    const [pdfPercentage, setPdfPercentage] = React.useState(50);
    const [dragging, setDragging] = React.useState(false);

    function getPdf() { return pdfPercentage.toString() + '%'; }
    function getEditor() { return (99 - pdfPercentage).toString() + '%'; }
    function clearSelection() { if (window.getSelection) { window.getSelection().removeAllRanges(); } }

    function calcPers(pixels) {
        const screenWidth = window.innerWidth;
        return (pixels / screenWidth)*100;
    }

    function startDrag() {
        clearSelection();
        setDragging(true);
    }

    const stopResize = (event) => {
        if (dragging) {
            setDragging(()=>false);
            console.log(dragging);
            setPdfPercentage(() => calcPers(event.clientX));
            return dragging;
        }
    };

    const animateResize = (event) => {
        if (dragging) {
            setPdfPercentage(() => calcPers(event.clientX));
        }
    };


    React.useEffect(() => {
        window.addEventListener('mouseup', stopResize);
        window.addEventListener('mousemove', animateResize);


        return () => {
            window.removeEventListener('mouseup', stopResize);
            window.removeEventListener('mousemove', animateResize);

        };
    }, [stopResize, dragging, startDrag]);

    return (
        <Box flexDirection="row" display="flex" height="100%">
            <Box flexGrow={1} style={{
                width: getPdf(),
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} hidden={dragging} fitToWidth={true} />
            </Box>

            <div
                onMouseDown={() => startDrag()}
                className="resizer"/>

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