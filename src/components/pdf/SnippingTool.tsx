import React, { useRef, useEffect, useState, MutableRefObject } from 'react';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';

const PREFIX = 'SnippingTool';

const classes = {
    reset: `${PREFIX}-reset`,
    hidden: `${PREFIX}-hidden`
};

const Root = styled('div')(() => ({
    [`& .${classes.reset}`]: {
        position: 'absolute',
        overflow: 'hidden',
        border: '2px #000 solid',
        zIndex: 2
    },

    [`& .${classes.hidden}`]: {
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: '1px; width: 1px',
        margin: '-1px; padding: 0; border: 0'
    }
}));

type PageProps = {
    // page: PDFPageProxy
    // scale?: number,
    // width?: number,
    // hidden?: boolean,
    // isVisible: boolean,
    children: | React.ReactChild
    | React.ReactChild[],
    screenshot: boolean,
    screenshotCallback?: (img: string) => void,
    scrollPosition: number,
};

export default React.memo(React.forwardRef(({ children, screenshot, screenshotCallback, scrollPosition }: PageProps,
    pageRef: MutableRefObject<HTMLDivElement>) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textLayerRef = useRef<HTMLDivElement>(null);
    const sToolRef = useRef<HTMLDivElement>(null);

    // State management
    // const [state, setState] = useState<PageState>(PageState.NEEDS_RENDER);

    // Caches for rendering quicker
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
    // const [textData, setTextData] = useState(null);

    // Viewport
    // const viewport = page.getViewport({
    //     scale: scale != null ? scale : (width / page.view[2])
    // });



    // Screenshots
    const screenshotLayerRef = useRef<HTMLDivElement>(null);
    const [screenshotRect, setScreenshotRect] = useState([0, 0, 0, 0]);
    const hiddenCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, []);

    useEffect(() => {
        // serWidth(divWidth.clientWidth)
        if (!screenshot) return;
        const mouseDownListener = (e: MouseEvent) => {
            if (!screenshot) return;
            e.preventDefault();
            e.stopPropagation();
            // const top = e.offsetY ;
            // const left = e.offsetX;
            let top = e.pageY - 148 + scrollPosition;
            let left = e.pageX;

            if (top < 0 || left < 0) return;

            // This hopefully never breaks, but who knows, no other stable way to solve this.
            setScreenshotRect(() => [
                top, left, top, left
            ]);
            ctx.beginPath();
            ctx.rect(left, top, left, top);

            sToolRef.current.addEventListener('mousemove', mouseMoveListener);
        };

        const mouseMoveListener = (e: MouseEvent) => {
            if (!screenshot || !e.buttons) return;

            e.preventDefault();
            e.stopPropagation();
            let top = e.pageY - 148 + scrollPosition;
            let left = e.pageX;

            if (top < 0 || left < 0) return;

            setScreenshotRect((cur) => [
                cur[0],
                cur[1],
                top,
                left,
            ]);
            ctx.beginPath();
            ctx.rect(left, top, left, top);
        };

        const mouseUpListener = (e: MouseEvent) => {
            if (!screenshot) return;
            // e.preventDefault();
            // e.stopPropagation();
            // console.log('Up listener', screenshot);
            sToolRef.current.removeEventListener('mousemove', mouseMoveListener);

            // Way to get (and set) the current screenshot rect.
            // setScreenshotRect works synchronously
            setScreenshotRect((cur) => {

                hiddenCanvas.current.width = Math.abs(cur[3] - cur[1]);
                hiddenCanvas.current.height = Math.abs(cur[2] - cur[0]);
                const hiddenCtx = hiddenCanvas.current.getContext('2d');
                let width = Math.abs(cur[3] - cur[1]);
                let height = Math.abs(cur[2] - cur[0]);
                let x = Math.min(cur[1], cur[3]);
                let y = Math.min(cur[0], cur[2]);

                hiddenCtx.drawImage(
                    canvasRef.current,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );
                if (width != 0 && height != 0 && x != 0 && y != 0) {
                    html2canvas(document.querySelector('.rpv-default-layout__container'), {
                        width: width,
                        height: height,
                        x: x,
                        y: y,
                    })
                        .then(function (screenshot) {
                            screenshotCallback(screenshot.toDataURL());
                        });
                }


                return [0, 0, 0, 0];
            });
        };

        sToolRef.current.addEventListener('mousedown', mouseDownListener);
        sToolRef.current.addEventListener('mouseup', mouseUpListener);

        return () => {
            sToolRef.current.removeEventListener('mousedown', mouseDownListener);
            sToolRef.current.removeEventListener('mousemove', mouseMoveListener);
            sToolRef.current.removeEventListener('mouseup', mouseUpListener);
        };

    }, [screenshot, scrollPosition]);

    return (
        <Root style={{
            position: 'relative',
            height: '100%'
        }} ref={sToolRef}>
            <canvas hidden ref={hiddenCanvas} />
            <canvas className="canvasWrapper" ref={canvasRef} style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
            }} />
            <div hidden={!screenshot || Math.abs(screenshotRect[2] - screenshotRect[0]) < 5 || Math.abs(screenshotRect[3] - screenshotRect[1]) < 5}
                className={classes.reset} ref={screenshotLayerRef} style={{
                    top: Math.min(screenshotRect[0], screenshotRect[2]),
                    left: Math.min(screenshotRect[1], screenshotRect[3]),
                    height: Math.abs(screenshotRect[2] - screenshotRect[0]),
                    width: Math.abs(screenshotRect[3] - screenshotRect[1])
                }} />
            {children}
            {/* Hidden class in necessary to retain selection information correctly */}
            <div hidden={screenshot} className={screenshot ? classes.hidden : 'textLayer'} ref={textLayerRef} />
        </Root>
    );

}));