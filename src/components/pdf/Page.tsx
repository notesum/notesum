
import React, { useRef, useEffect, useState, MutableRefObject } from 'react';
import { renderTextLayer } from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/display/api';

type PageProps = {
    page: PDFPageProxy
    scale?: number,
    width?: number,
    hidden?: boolean
    isVisible: boolean
};

enum PageState {
    NEEDS_RENDER,       // Initial state, signifies that the page is not currently being rendered and that it needs to be
    RENDERING,          // Page is currently rendering (the page shouldn't be rendered twice at the same time)
    RENDERING_OUTDATED, // Page is currently being rendered but is already outdated
    FINISHED            // Page is fully rendered and doesn't need a re-render a.t.m.
}

export default React.forwardRef(({ page, scale, width, hidden, isVisible }: PageProps, pageRef: MutableRefObject<HTMLDivElement>) => {

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

    return (
        <div data-id={page.pageNumber - 1} ref={pageRef} hidden={hidden} className="page" style={{
            width: viewport.width,
            height: viewport.height
        }}>
            <canvas  className="canvasWrapper" width={viewport.width} height={viewport.height} ref={canvasRef} />
            <div className="textLayer" ref={textLayerRef} />
        </div>
    );

});