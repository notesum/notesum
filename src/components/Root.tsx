import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

import App from './app/App';
import MainView from './app/MainView';

export default function Root() {
    return (
        <BrowserRouter >
            <div style={{overflowY:'hidden'}}>
                <ButtonGroup variant="text">
                    <Button href="/">Home</Button>
                    <Button href="/about">About</Button>
                    <Button href="/pdf">PDF</Button>
                </ButtonGroup>

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
            </div>
        </BrowserRouter>
    );
}