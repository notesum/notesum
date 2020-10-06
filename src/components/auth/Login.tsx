import React, { useState, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Input, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from './../../redux/login/actions'
import { fetchRequest } from './../../redux/User/actions';
// import { UserActionTypes } from './../redux/User/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(2),
                width: 400,
            },
        },

    }),
);

type LogInProps = {
    buttonCallback?: (a: boolean) => void
};

export default function Login({ buttonCallback }: LogInProps) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        console.log(email, password)
        const loginData = { email: email, password: password }
        console.log(loginData);
        // useDispatch<Dispatch<UserActionTypes>>(fetchRequest());
    }

    return (
        <Box m={3}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Typography variant="h4">Log In</Typography>
                </Grid>

                {/* <Grid item>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value="Submit"/>
                </form>
            </Grid> */}

                <Grid item>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField type='text' onChange={(event) => setEmail(event.target.value)} label="Email" />
                        </div>
                        <div>
                            <TextField type='password' onChange={(event) => setPassword(event.target.value)} label="Password" />
                        </div>
                    </form>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="primary" onMouseDown={() => handleSubmit()}>Log In</Button>
                </Grid>
                <Grid item style={{ marginTop: '30px' }}>
                    <Typography variant="h6">Don't have an acount?</Typography>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button onMouseDown={() => buttonCallback(true)} variant="contained" color="primary">Sign Up</Button>

                </Grid>
            </Grid >
        </Box>
    );
}