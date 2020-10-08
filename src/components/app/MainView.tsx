import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample3.pdf';

import './MainView.css';

export default function MainView() {

    const [screenshot, setScreenshot] = useState(false);
    const [image, setImage] = useState('');


    const setCallback = (img) => {
        setImage(img);
    };

    const setSS = (b) => {
        setScreenshot(b);
    };

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
    }, [dragging]);

    return (
        <Box flexDirection="row" display="flex" height="100%" {...{ ref: mainViewRef }}>
            <Box flexGrow={1} style={{
                width: `${pdfPercentage}%`,
                overflow: 'auto',
                height: '100%'
            }}>
                <Pdf file={file} screenshot={screenshot} screenshotCallback={setCallback} hidden={dragging} fitToWidth={true} />
            </Box>

            <div
                onMouseDown={() => startDrag()}
                className="resizer" />

            <Box flexGrow={1} style={{
                width: `${99 - pdfPercentage}%`,
                overflow: 'hidden',
                height: '100%',
                backgroundColor: 'white'
            }}>
                <TextEditor screenshotCallback={setSS} img={image} dragging={dragging} />
            </Box>
        </Box>
    );
}