import React from 'react';
import { Button, Dialog, Grid, Typography, Box, CircularProgress } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/actions/projectActions';

import { AppState } from '../../redux/reducers';
import { getUserInfo, logout } from '../../redux/asyncActions/authAsyncActions';
import { REDIRECT } from '../../redux/types/redirectTypes';

import Login from './Login';
import SignUp from './SignUp';


import user from "../../resources/user.svg";


type AuthProps = {
    // Force open the dialog without a user click
    openProp: boolean
};

export default function AuthIcon({ openProp }: AuthProps) {

    const projects = useSelector((state: AppState) => state.projects);

    // Force open the dialog without a user click
    React.useEffect(() => {
        if (openProp) {
            setDialogOpen(() => true);
        }

    }, [openProp]);

    // States from redux
    const { loading, isLoggedIn } = useSelector((state: AppState) => state.auth);
    const error = useSelector((state: AppState) => state.auth.errors);
    const username = useSelector((state: AppState) => state.auth.user.name);

    const dispatch = useDispatch();

    // Get user information if the login status changes
    React.useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserInfo());
        }
    }, [isLoggedIn]);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [signDialog, setSignDialog] = React.useState(false);

    function logOut() {
        dispatch({
            type: REDIRECT,
            payload: `/`
        });
        dispatch(logout());
        setTimeout(() => {
            Object.keys(projects).map((uuid) => dispatch(deleteProject(uuid)))

        }, 5000)
    }

    // Should the error banner be displayed
    function isError() {
        if (error === null) {
            return false;
        }
        return error.length > 0;
    }

    // Shown when a user is logged in
    const actuallyLoggedIn = (
        <Box m={4} style={{ overflow: 'hidden' }}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Logged in as {username}</Typography>
                </Grid>
                <Grid item>
                    <Button onMouseDown={() => logOut()} variant="contained" color="primary">Log Out</Button>
                </Grid>
            </Grid>
        </Box>
    );

    // The error banner on top of the login / signup dialog
    const errorHappened = (
        <Box m={4} style={{ overflow: 'hidden' }}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h5">Something went wrong logging in</Typography>
                </Grid>
                <Grid item>
                    <Typography color="secondary" variant="body2">Your password or Email might not have been correct</Typography>
                </Grid>
            </Grid>
        </Box>
    );

    const closeDialog = () => {
        setDialogOpen(false);
        setSignDialog(false);
    };

    return (
        <div>
            <Button onMouseDown={() => setDialogOpen(true)}><img src={user} alt="" />
                <p>Profile</p>
                {/* <Typography variant="body1" style={{ color: 'white', paddingLeft: '5px' }}>{username}</Typography> */}
            </Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <div>
                    {/* TODO: Get rid of the errorHappened after it is displayed once */}
                    {isError() && errorHappened}
                    {loading && <Box m={5}><CircularProgress /></Box>}
                    {!isLoggedIn && !signDialog && !loading && <Login buttonCallback={setSignDialog} />}
                    {!isLoggedIn && signDialog && !loading && <SignUp />}
                    {isLoggedIn && !loading && actuallyLoggedIn}
                </div>
            </Dialog>
        </div>
    );
}