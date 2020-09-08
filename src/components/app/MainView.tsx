import React from 'react';
import Pdf from './PdfViewer'
import Editor from './Editor'
import 'bootstrap/dist/css/bootstrap.css';


export default function MainView() {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-5 col-md-6 col-lg-4">
                        <Pdf />
                    </div>
                    <div className="col-sm-10 col-md-6 col-lg-8">
                        <Editor />
                    </div>
                </div>
            </div>
        </>
    );
}