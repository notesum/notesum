import React from 'react';
import { Button, Dialog, Grid, Typography, Box, CircularProgress } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { getUserInfo, logout } from '../../redux/asynchActions/authAsynchActions';

import Login from './Login';
import SignUp from './SignUp';



export default function AuthIcon() {

    const { loading, isLoggedIn } = useSelector((state: AppState) => state.auth);
    const error = useSelector((state: AppState) => state.auth.errors);

    const username = useSelector((state: AppState) => state.auth.user.name);
    const dispatch = useDispatch();

    // This is very handy to test front end auth components
    // const loading = false;
    // const isLoggedIn = false;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [signDialog, setSignDialog] = React.useState(false);

    function logOut() {
        dispatch(logout());
    }

    function getDetails() {
        dispatch(getUserInfo());
    }
    function getError() {
        return error.length > 0;
    }

    const actuallyLoggedIn = (
        <Box m={4} style={{ overflow: 'hidden' }}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Logged in as {username}</Typography>
                </Grid>
                <Grid item>
                    <Button onMouseDown={() => logOut()} variant="contained" color="primary">Log Out</Button>
                </Grid>
                <Grid item>
                    <Button onMouseDown={() => getDetails()} variant="contained" color="primary">Get details</Button>
                </Grid>
            </Grid>
        </Box>
    );

    const errorHappened = (
        <Box m={4} style={{ overflow: 'hidden' }}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Something went wrong logging in</Typography>
                </Grid>
                <Grid item>
                    <Typography color="secondary" variant="body2">Your password or username might not have been correct</Typography>
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
            <Button onMouseDown={() => setDialogOpen(true)}> <AccountCircleIcon style={{ color: 'white' }} />
                <Typography variant="body1" style={{ color: 'white', paddingLeft: '5px' }}>{username}</Typography>
            </Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <div>
                    {getError() && errorHappened}
                    {loading && <Box m={5}><CircularProgress /></Box>}
                    {!isLoggedIn && !signDialog && !loading && <Login buttonCallback={setSignDialog} />}
                    {!isLoggedIn && signDialog && !loading && <SignUp />}
                    {isLoggedIn && !loading && actuallyLoggedIn}
                </div>
            </Dialog>
        </div>
    );
}