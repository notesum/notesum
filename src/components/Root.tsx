import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import App from './app/App';
import MainView from './app/MainView'

export default function Root() {
    return (
        
        
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/pdf">Pdf</Link>
                    </li>
                </ul>

                <hr />
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route path="/about">
                        <h1>About</h1>
                    </Route>
                    <Route path="/dashboard">
                        <h1>Dashboard</h1>
                    </Route>
                    <Route path="/pdf">
                        <MainView />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}