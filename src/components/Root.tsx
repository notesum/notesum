import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IconButton, Box, Button, AppBar, Toolbar } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import 'regenerator-runtime/runtime';

import App from './app/App';
import About from './app/About';
import Project from './project/Project';
import ProjectOverview from './project_overview/ProjectOverview';
import Error from './Error';

export default function Root() {
    return (
        <BrowserRouter>
            <Box flexDirection="column" display="flex" height="100%" >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton href="/"><HomeIcon style={{ color: '#fff' }} /></IconButton >
                        <IconButton href="/about"><InfoIcon style={{ color: '#fff' }} /></IconButton>
                        <IconButton href="/projects"><PictureAsPdfIcon style={{ color: '#fff' }} /></IconButton>
                        <Button style={{ color: 'white' }}>Feedback</Button>
                    </Toolbar>
                </AppBar>

                {/* This sizes the main content area to fill up the remaining space */}
                <Box flexGrow={1} style={{
                    minHeight: '0'
                }}>
                    <Switch >
                        <Route exact path="/">
                            <App />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route exact path="/projects">
                            <ProjectOverview />
                        </Route>
                        <Route exact path="/project/:uuid" children={<Project />} />
                        <Route path="*">
                            <Error />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    );
}