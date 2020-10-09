import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IconButton, Box, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import 'regenerator-runtime/runtime';

import PrivateRoute from '../Routes/PrivateRoute';

import App from './app/App';
import About from './app/About';
import MainView from './app/MainView';
import AuthIcon from './auth/AuthIcon';


export default function Root() {
    return (
        <BrowserRouter>
            <Box flexDirection="column" display="flex" height="100%" >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton href="/"><HomeIcon style={{ color: '#fff' }} /></IconButton >
                        <IconButton href="/about"><InfoIcon style={{ color: '#fff' }} /></IconButton>
                        <IconButton href="/pdf"><PictureAsPdfIcon style={{ color: '#fff' }} /></IconButton>
                        <Box style={{ marginLeft: 'auto' }}>
                            <AuthIcon />
                        </Box>
                        <Button style={{ color: 'white' }}><Typography variant="body1" style={{ color: 'white' }}>Feedback</Typography></Button>
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
                        <PrivateRoute path="/pdf" component={MainView} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    );
}