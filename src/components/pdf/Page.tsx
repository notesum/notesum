
import React, { useRef, useEffect, useState } from 'react';
import { renderTextLayer } from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/display/api';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';
import 'pdfjs-dist/web/pdf_viewer.css';

type PageProps = {
    page: PDFPageProxy
    scale: number
};

export default function Page({ page, scale }: PageProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textLayerRef = useRef<HTMLDivElement>(null);
    const [viewport, setViewport] = useState<PageViewport | undefined>(undefined);

    useEffect(() => {
        const updatedViewport = page.getViewport({ scale });
        setViewport(updatedViewport);

        // Empty text layer when changed
        textLayerRef.current.innerHTML = '';

        // Render Canvas
        page.render({
            canvasContext: canvasRef.current.getContext('2d'),
            viewport: updatedViewport
        });

        // Render text content
        page.getTextContent().then(textContent => {
            renderTextLayer({
                container: textLayerRef.current,
                viewport: updatedViewport,
                textContent,
                enhanceTextSelection: false
            });
        });

    }, [page, scale]);

    return (
        <div className="page" style={{
            width: viewport ? viewport.width : 0,
            height: viewport ? viewport.height : 0
        }}>
            <canvas className="canvasWrapper" ref={canvasRef} height={viewport ? viewport.height : '0px'} width={viewport ? viewport.width : '0px'} />
            <div className="textLayer" ref={textLayerRef} />
        </div>
    );

}