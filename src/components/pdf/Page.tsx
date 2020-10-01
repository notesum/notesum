
import React, { useRef, useEffect, useState, MutableRefObject } from 'react';
import { renderTextLayer } from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/display/api';
import { makeStyles } from '@material-ui/core';

type PageProps = {
    page: PDFPageProxy
    scale?: number,
    width?: number,
    hidden?: boolean,
    isVisible: boolean,

    screenshot: boolean,
    screenshotCallback?: (img: string) => void
};

enum PageState {
    NEEDS_RENDER,       // Initial state, signifies that the page is not currently being rendered and that it needs to be
    RENDERING,          // Page is currently rendering (the page shouldn't be rendered twice at the same time)
    RENDERING_OUTDATED, // Page is currently being rendered but is already outdated
    FINISHED            // Page is fully rendered and doesn't need a re-render a.t.m.
}

const useStyles = makeStyles(() => ({
    reset: {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.1)',
        border: '2px #000 solid'
    }
}));

export default React.forwardRef(({ page, scale, width, hidden, isVisible, screenshot, screenshotCallback }: PageProps,
                                 pageRef: MutableRefObject<HTMLDivElement>) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textLayerRef = useRef<HTMLDivElement>(null);

    // State management
    const [state, setState] = useState<PageState>(PageState.NEEDS_RENDER);

    // Caches for rendering quicker
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
    const [textData, setTextData] = useState(null);

    // Viewport
    const viewport = page.getViewport({
        scale: scale != null ? scale : (width / page.view[2])
    });

    const classes = useStyles();

    // Screenshots
    const screenshotLayerRef = useRef<HTMLDivElement>(null);
    const [screenshotRect, setScreenshotRect] = useState([0,0,0,0]);
    const hiddenCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, []);

    // Effect called when state changes
    useEffect(() => {
        // Empty text layer when changed
        textLayerRef.current.innerHTML = '';
        setState((curState) => curState === PageState.RENDERING ? PageState.RENDERING_OUTDATED : PageState.NEEDS_RENDER);
    }, [page, scale, width]);

    // Main renderer. Should only be ran once after every update
    useEffect(() => {
        if (!isVisible || state !== PageState.NEEDS_RENDER || hidden) return;

        setState(() => PageState.RENDERING);

        // Render
        (async () => {
            const PageRenderer = page.render({
                canvasContext: ctx,
                viewport
            }).promise;

            const text = textData === null ? await page.getTextContent() : textData;
            if (textData === null) {
                setTextData(text);
            }

            // Render text content
            const textRenderer = renderTextLayer({
                container: textLayerRef.current,
                viewport,
                textContent: text,
                enhanceTextSelection: false
            });

            await Promise.all([PageRenderer, textRenderer]);

            setState((curState) => curState === PageState.RENDERING_OUTDATED ? PageState.NEEDS_RENDER : PageState.FINISHED);
        })();

    }, [isVisible, state, hidden]);

    useEffect(() => {
        if (!screenshot) return;

        const mouseDownListener = (e: MouseEvent) => {

            // This hopefully never breaks, but who knows, no other stable way to solve this.
            setScreenshotRect(() => [
                e.pageY + pageRef.current.parentElement.scrollTop - pageRef.current.offsetTop - 10,
                e.pageX + pageRef.current.parentElement.scrollLeft - pageRef.current.offsetLeft - 10,
                e.pageY + pageRef.current.parentElement.scrollTop - pageRef.current.offsetTop - 10,
                e.pageX + pageRef.current.parentElement.scrollLeft - pageRef.current.offsetLeft - 10,
            ]);

            pageRef.current.addEventListener('mousemove', mouseMoveListener);
        };

        const mouseMoveListener = (e: MouseEvent) => {
            setScreenshotRect((cur) => [
                cur[0],
                cur[1],
                e.pageY + pageRef.current.parentElement.scrollTop - pageRef.current.offsetTop - 10,
                e.pageX + pageRef.current.parentElement.scrollLeft - pageRef.current.offsetLeft - 10,
            ]);
        };

        const mouseUpListener = () => {
            pageRef.current.removeEventListener('mousemove', mouseMoveListener);

            // Way to get (and set) the current screenshot rect.
            setScreenshotRect((cur) => {
                hiddenCanvas.current.width = Math.abs(cur[3] - cur[1]);
                hiddenCanvas.current.height = Math.abs(cur[2] - cur[0]);

                const hiddenCtx = hiddenCanvas.current.getContext('2d');

                hiddenCtx.drawImage(
                    canvasRef.current,
                    Math.min(cur[1], cur[3]),
                    Math.min(cur[0], cur[2]),
                    Math.abs(cur[3] - cur[1]),
                    Math.abs(cur[2] - cur[0]),
                    0,
                    0,
                    Math.abs(cur[3] - cur[1]),
                    Math.abs(cur[2] - cur[0])
                );

                screenshotCallback(hiddenCanvas.current.toDataURL());

                return [0, 0, 0, 0];
            });
        };

        pageRef.current.addEventListener('mousedown', mouseDownListener);
        pageRef.current.addEventListener('mouseup', mouseUpListener);

        return () => {
            pageRef.current.removeEventListener('mousedown', mouseDownListener);
            pageRef.current.removeEventListener('mousemove', mouseMoveListener);
            pageRef.current.removeEventListener('mouseup', mouseUpListener);
        };

    }, [screenshot]);

    return (
        <div data-id={page.pageNumber - 1} ref={pageRef} hidden={hidden} className="page" style={{
            width: viewport.width,
            height: viewport.height
        }}>
            <canvas hidden ref={hiddenCanvas} />
            <canvas  className="canvasWrapper" width={viewport.width} height={viewport.height} ref={canvasRef} />
            <div hidden={!screenshot || Math.abs(screenshotRect[2] - screenshotRect[0]) < 5 || Math.abs(screenshotRect[3] - screenshotRect[1]) < 5}
                 className={classes.reset} ref={screenshotLayerRef} style={{
                top: Math.min(screenshotRect[0], screenshotRect[2]),
                left: Math.min(screenshotRect[1], screenshotRect[3]),
                height: Math.abs(screenshotRect[2] - screenshotRect[0]),
                width: Math.abs(screenshotRect[3] - screenshotRect[1])
            }}/>
            <div hidden={screenshot} className="textLayer" ref={textLayerRef} />
        </div>
    );

});