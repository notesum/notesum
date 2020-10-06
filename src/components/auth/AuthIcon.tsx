import React from 'react';
import { Button, Dialog, Grid, IconButton, Typography, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function AuthIcon() {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState('Not Set In Auth');
    const [dialogOpen, setDialogOpen] = React.useState(false);


    function logOut() {
        setLoggedIn(false);
        console.log('Log out');
    }


    const notLoggedIn =
        <Box m={4}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h4">You seemed to be not logged in.</Typography>
                </Grid>
                <Grid item>
                    <Button href="/login" variant="contained" color="primary">Log In</Button>
                </Grid>
                <Grid item>
                    <Button href="/signup" variant="contained" color="primary">Sign Up</Button>
                </Grid>
            </Grid>
        </Box>;

    const actuallyLoggedIn =
        <Box m={4}>
            <Grid container wrap="wrap" direction="column" spacing={2} alignContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Logged in as {username}</Typography>
                </Grid>
                <Grid item>
                    <Button onMouseDown={() => logOut()} variant="contained" color="primary">Log Out</Button>
                </Grid>
            </Grid>

        </Box>;


    return (
        <div>
            <Button onMouseDown={() => setDialogOpen(true)}> <AccountCircleIcon style={{ color: 'white' }} /></Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <div>
                    {!loggedIn && notLoggedIn}
                </div>
                <div>
                    {loggedIn && actuallyLoggedIn}
                </div>
            </Dialog>
        </div>
    );
}