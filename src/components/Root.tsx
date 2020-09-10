import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import App from './app/App';
import MainView from './app/MainView';

export default function Root() {
    return (
        <BrowserRouter>
            <Box flexDirection="column" display="flex" height="100%">
                <Box m={1}>
                    <Button href="/"><HomeIcon /></Button>
                    <Button href="/about"><InfoIcon /></Button>
                    <Button href="/pdf"><PictureAsPdfIcon /></Button>
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
                            <h1>About</h1>
                        </Route>
                        <Route path="/pdf">
                            <MainView />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    );
}