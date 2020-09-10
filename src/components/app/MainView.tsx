import React from 'react';
import { Grid } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';
import file from '../../resources/sample2.pdf';

export default function MainView() {
    // I put a scroll here for now but the pdf component should handle this better
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Pdf file={file}/>
                </Grid>
                <Grid item xs={6}>
                    <TextEditor />
                </Grid>

            </Grid>
        </div>
    );

}