import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';

import './MainView.css';

export default function MainView() {

    const [pdfPercentage, setPdfPercentage] = React.useState(50);
    const [dragging, setDragging] = React.useState(false);

    const mainViewRef = useRef<HTMLDivElement>(null);

    function calcPers(pixels: number) {
        return (pixels / mainViewRef.current.clientWidth) * 100;
    }

    function clearSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }

    function startDrag() {
        clearSelection();
        setDragging(true);
    }

    const stopResize = (event: MouseEvent) => {
        if (dragging) {
            setDragging(() => false);
            setPdfPercentage(() => calcPers(event.clientX));
            return dragging;
        }
    };

    const animateResize = (event: MouseEvent) => {
        if (dragging) {
            setPdfPercentage(() => calcPers(event.clientX));
        }
    };


    useEffect(() => {
        window.addEventListener('mouseup', stopResize);
        window.addEventListener('mousemove', animateResize);


        return () => {
            window.removeEventListener('mouseup', stopResize);
            window.removeEventListener('mousemove', animateResize);

        };
    }, [stopResize, dragging, startDrag]);

    return (
        <Box flexDirection="row" display="flex" height="100%" {...{ ref: mainViewRef }}>
            <Box flexGrow={1} style={{
                width: `${pdfPercentage}%`,
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} hidden={dragging} fitToWidth={true} />
            </Box>

            <div
                onMouseDown={() => startDrag()}
                className="resizer" />

            <Box flexGrow={1} style={{
                width: `${99 - pdfPercentage}%`,
                overflow: 'hidden',
                height: '100%',
                backgroundColor: '#eee'
            }}>
                <TextEditor />
            </Box>
        </Box>
    );
}