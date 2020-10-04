import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core';

import example from '../../resources/example.png';

export default function About() {

    return (
        <div style={{overflow: 'hidden'}}>
            <Box my={7}>
                <Container>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" style={{fontWeight: 'bold'}} gutterBottom>
                        How it will save your time and organize your material
                </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        NoteSum is a PDF summarization tool that gives you full control of what you want to gather.
                        Extract hightlighted information automatically into a new file which is downloadable as a word file.
                        Upload any PDF you want to your personal vault and start summarizing. Annotate and comment
                        freely in the output window on the right site.
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Easy as that!
                </Typography>
                </Container>
                    <Grid container spacing={2} justify="center" direction="column" alignContent="center" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="primary" href="/pdf">Try It!</Button>
                        </Grid>
                        <Grid item justify="center">
                            <img src={example} style={{ height: '55vmin'}}/>
                        </Grid>

                    </Grid>
            </Box>
        </div>
    );





}