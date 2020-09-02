import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import App from './app/App';

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
                </Switch>
            </div>
        </BrowserRouter>
    );
}