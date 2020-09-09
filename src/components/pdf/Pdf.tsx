import React, { useEffect, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/display/api';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import 'pdfjs-dist/web/pdf_viewer.css';
import { Button, Box, ButtonGroup } from '@material-ui/core';


import pdf from '../../resources/sample2.pdf';

import Page from './Page';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Pdf() {

    const [document, setDocument] = useState<undefined | PDFDocumentProxy>(undefined);
    const [pages, setPages] = useState<PDFPageProxy[]>([]);
    const [scale, setScale] = useState(1.5);

    // Load document
    useEffect(() => {
        (async () => {
            setDocument(await getDocument({ url: pdf }).promise);
        })();
    }, []);

    // Render page / document
    useEffect(() => {
        if (document == null) return;

        (async () => {
            const pagePromises = [];
            for (let i = 1; i <= document.numPages; i++) {
                pagePromises.push(document.getPage(i));
            }

            setPages(await Promise.all(pagePromises));
        })();
    }, [document]);

    return (
        <div>
            <ButtonGroup variant="typomakesthisthebestwithoutmeaddingcss">
                <Button onClick={() => setScale(scale + 0.1)}>+</Button>
                <Button onClick={() => setScale(scale - 0.1)}>-</Button>
            </ButtonGroup>

            <Box>
                <div className="pdfViewer">
                    {pages.map((page, id) => {
                        return (<Page key={id} scale={scale} page={page}/>);
                    })}
                </div>
            </Box>
        </div>
    );
}