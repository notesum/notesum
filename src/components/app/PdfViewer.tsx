import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel';
import sample from '../../resources/sample.pdf'
import TextSelector from 'text-selection-react'
import Button from 'react-bootstrap/Button';

// Some options for the PDF library
const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};


// Main class
export default function Pdf() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selected, setSelected] = useState(null)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1)
        setSelected("Nothing selected yet")
    }

    // Hack for alligning the text and the image
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

    function high(t) {

        setSelected(selected + '\n\n' + t);
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
            <TextSelector
                events={[
                    {
                        text: 'Submit',
                        handler: (html, text) => {high(text)}
                    }
                ]}
                color={'yellow'}
                colorText={false}
            />
            <h1>PDF Demo</h1>
            <div>
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