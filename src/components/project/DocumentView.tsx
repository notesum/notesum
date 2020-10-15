import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { DocumentInitParameters, PDFDataRangeTransport, TypedArray } from 'pdfjs-dist/types/display/api';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';

import './DocumentView.css';

type DocumentViewProps = {
    pdf: string | TypedArray | DocumentInitParameters | PDFDataRangeTransport
    fileId: string
};

export default function DocumentView({ pdf, fileId }: DocumentViewProps) {

    const [screenshot, setScreenshot] = useState(false);
    const [image, setImage] = useState('');

    const setCallback = (img: string) => {
        setImage(img);
    };

    // States for the resizing of panels
    const [pdfPercentage, setPdfPercentage] = React.useState(50);
    const [dragging, setDragging] = React.useState(false);

    const mainViewRef = useRef<HTMLDivElement>(null);

    // Convert pixels to current element size percentage
    function calcPers(pixels: number) {
        return (pixels / mainViewRef.current.clientWidth) * 100;
    }

    // Start dragging the bar in the middle
    function startDrag() {
        // If there is text selected, deselect
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        setDragging(true);
    }

    // Stop dragging of the middle bar, stop resizing
    const stopDragging = (event: MouseEvent) => {
        if (dragging) {
            setDragging(() => false);
            setPdfPercentage(() => calcPers(event.clientX));
            return dragging;
        }
    };

    // While dragging, render the change sizes
    const animateResize = (event: MouseEvent) => {
        if (dragging) {
            setPdfPercentage(() => calcPers(event.clientX));
        }
    };

    useEffect(() => {
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('mousemove', animateResize);

        return () => {
            window.removeEventListener('mouseup', stopDragging);
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
                <Pdf id={fileId} file={pdf} screenshot={screenshot} screenshotCallback={setCallback} hidden={dragging} fitToWidth={true} />
            </Box>

            <div
                onMouseDown={() => startDrag()}
                className="resizer" />

            <Box flexGrow={1} style={{
                width: `${99 - pdfPercentage}%`,
                overflow: 'hidden',
                height: '100%'
            }}>
                <TextEditor key={fileId} fileId={fileId} screenshotCallback={setScreenshot} img={image} dragging={dragging} />
            </Box>
        </Box>
    );
}