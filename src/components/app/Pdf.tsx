import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel';
import sample from '../../resources/sample.pdf'


// Some options for the PDF library
const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};


// Main class
export default function Pdf() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Will need for navigation
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1)
    }

    // Best hack I can find that fixes the text allignment issue
    function removeTextLayerOffset() {
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
          textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
      }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        // Amazing parent element
        <>
            <h1>Hey</h1>
            <div>
                <p>
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
            <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
            </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
            </button>
            </div>
            <Document
                file={sample}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
            </Document>

        </>
    );
}