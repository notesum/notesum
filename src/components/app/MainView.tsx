import React from 'react';
import Pdf from './PdfViewer'
import Editor from './Editor'
import 'bootstrap/dist/css/bootstrap.css';


export default function MainView() {


    return (
        <>
            <div className="split left">
                <div className="centered">
                    <Pdf/>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <Editor />
                </div>
            </div>
        </>
    );







}