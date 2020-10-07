import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box, IconButton } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import App from './app/App';
import About from './app/About';
import Project from './project/Project';
import ProjectOverview from './project_overview/ProjectOverview';
import Error from './Error';

export default function Root() {
    return (
        <BrowserRouter>
            <Box flexDirection="column" display="flex" height="100%" >
                <Box m={0} bgcolor="primary.main">
                    <IconButton href="/"><HomeIcon style={{color: '#fff'}} fontSize="small"/></IconButton >
                    <IconButton href="/about"><InfoIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
                    <IconButton href="/project"><PictureAsPdfIcon style={{color: '#fff'}} fontSize="small"/></IconButton>
                </Box>

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