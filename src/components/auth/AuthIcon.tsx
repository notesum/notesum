import React from 'react';
import { Button, Dialog, Grid, Typography, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Login from './Login';
import SignUp from './SignUp';


export default function AuthIcon() {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState('Nouser');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [signDialog, setSignDialog] = React.useState(false);



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

    const closeDialog = () => {

        setDialogOpen(false);
        setSignDialog(false);

    };


    return (
        <div>
            <Button onMouseDown={() => setDialogOpen(true)}> <AccountCircleIcon style={{ color: 'white' }} />
                <Typography variant="body1" style={{color: 'white', paddingLeft: '5px'}}>{username}</Typography>
            </Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <div>
                    {!loggedIn && !signDialog && <Login buttonCallback={setSignDialog}/>}
                    {!loggedIn && signDialog && <SignUp />}
                    {loggedIn && actuallyLoggedIn}
                </div>
            </Dialog>
        </div>
    );
}