import React from 'react';
import { Grid, Box } from '@material-ui/core';

import Pdf from '../pdf/Pdf';
import TextEditor from '../editor/Editor';

export default function MainView() {
    // I put a scroll here for now but the pdf component should handle this better
    return (
        <div>
            <Grid container spacing={1} alignContent={'stretch'}>
                <Grid item xs={6}>
                    <Pdf />
                </Grid>
                <Grid item xs={6}>
                    <TextEditor />
                </Grid>
            </Grid>
        </div>
    );

}