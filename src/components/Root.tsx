import React, { Dispatch, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Box, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import 'regenerator-runtime/runtime';

import PrivateRoute from '../Routes/PrivateRoute';
import { AppState } from '../redux/reducers';
import { RedirectActionTypes, REDIRECTED } from '../redux/types/redirectTypes';

import App from './app/App';
import About from './app/About';
import AuthIcon from './auth/AuthIcon';
import Project from './project/Project';
import ProjectOverview from './project_overview/ProjectOverview';
import Error from './Error';
import Terms from './app/Terms';
import Poster from './app/Poster';

export default function Root() {
    const { isLoggedIn } = useSelector((state: AppState) => state.auth);
    const [makeLogin, setMakeLogIn] = React.useState(false);

    // Redux redirection
    const history = useHistory();
    const dispatch = useDispatch<Dispatch<RedirectActionTypes>>();
    const redirect = useSelector((state: AppState) => state.redirect);
    useEffect(() => {
        if (redirect.url) {
            dispatch({
                type: REDIRECTED
            });
            history.push(redirect.url);
        }
    }, [redirect, history]);

    return (
        <Box flexDirection="column" display="flex" height="100%" >
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Link to="/"><IconButton><HomeIcon style={{ color: '#fff' }} /></IconButton ></Link>
                    <Link to="/about"><IconButton><InfoIcon style={{ color: '#fff' }} /></IconButton></Link>
                    <Link hidden={!isLoggedIn} to="/projects"><IconButton><PictureAsPdfIcon style={{ color: '#fff' }} /></IconButton></Link>
                    <Box style={{ marginLeft: 'auto' }}>
                        <AuthIcon openProp={makeLogin} />
                    </Box>
                    <Button target="_blank"
                        href="https://docs.google.com/forms/d/e/1FAIpQLScK9dZrpjcqcL4SGUc_bcwpAxWYSAH62hYPfdcK_v-2z0PRow/viewform"
                        style={{ color: 'white' }}><Typography variant="body1" style={{ color: 'white' }}>Feedback</Typography></Button>
                    <Button target="_blank"
                        href="/terms"
                        variant="text"
                        style={{ color: 'white' }}><Typography variant="subtitle2" style={{ color: 'white' }}>Terms and Conditions</Typography></Button>
                </Toolbar>
            </AppBar>

            {/* This sizes the main content area to fill up the remaining space */}
            <Box flexGrow={1} style={{
                minHeight: '0',
                overflowX: 'hidden'
            }}>
                <Switch >
                    <Route exact path="/">
                        <App loginCallback={setMakeLogIn} />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/poster">
                        <Poster />
                    </Route>
                    <Route path="/terms">
                        <Terms />
                    </Route>
                    <PrivateRoute path="/projects">
                        <ProjectOverview />
                    </PrivateRoute>
                    <PrivateRoute exact path="/project/:id/:urlFileId?" children={<Project />} />
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}