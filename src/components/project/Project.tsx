import React, { useState } from 'react';

import Pdf from '../pdf/Pdf';

import EmptyProject from './EmptyProject';

export default function Project() {

    const [file, setFile] = useState<Int8Array>(null);

    return (
    <>
        {file && <>
            <Pdf file={{data: file}} hidden={false} fitToWidth={false} />
        </>}


        {!file && <>
                <EmptyProject addFile={(toAdd) => setFile(toAdd)} />
        </>}
    </>);
}