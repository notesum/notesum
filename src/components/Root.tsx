import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Button, Grid, Box } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import App from './app/App';
import MainView from './app/MainView';

export default function Root() {
    return (
        <BrowserRouter >
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box m={1}>
                        <Button href="/"><HomeIcon /></Button>
                        <Button href="/about"><InfoIcon /></Button>
                        <Button href="/pdf"><PictureAsPdfIcon /></Button>
                    </Box>
                </Grid >
                <Grid item xs={12}>
                    <Switch >
                        <Route exact path="/">
                            <App />
                        </Route>
                        <Route path="/about">
                            <h1>About</h1>
                        </Route>
                        <Route path="/pdf">
                            <div className="App">
                                <MainView />
                            </div>
                        </Route>
                    </Switch>
                </Grid >

            </Grid>
        </BrowserRouter>
    );
}