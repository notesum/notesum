import React, { useRef, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import PdfViewer from '../pdf/PdfViewer';
import TextEditor from '../editor/Editor';
import useNotes from '../../hooks/useNotes';
// import { Note, Notes } from '../../redux/types/noteType';
// import { Files } from '../../redux/types/filesTypes';

import './DocumentView.css';

type DocumentViewProps = {
    pdf: string
    fileId: string
};

export default function DocumentView({ pdf, fileId }: DocumentViewProps) {
    const [screenshot, setScreenshot] = useState(false);
    const [image, setImage] = useState('');
    const [ScrollPosition, setScrollPosition] = useState(0);

    const setCallback = (img: string) => {
        setImage(img);
        return null;
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

    const onScrollEvent = (e) =>{
        setScrollPosition(e.target.scrollTop);
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
                height: '100%'
            }} onScroll={onScrollEvent}>
                <PdfViewer fileId={fileId} fileUrl={pdf} screenshot={screenshot} setScreenshotCallback={setCallback}
                           scrollPosition={ScrollPosition}/>
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