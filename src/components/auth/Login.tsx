import React, { useState, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from './../../redux/login/actions'
import { fetchRequest } from './../../redux/User/actions';
import { UserActionTypes } from './../redux/User/types';

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

export default function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        console.log(email)
        const loginData = {email: email, password: password}
        console.log(loginData);
        useDispatch<Dispatch<UserActionTypes>>(fetchRequest());
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh'}}
        >
            <Grid item>
                <Typography variant="h4">Log In</Typography>
            </Grid>

            <Grid item>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value="Submit"/>
                </form>
            </Grid>

            {/* <Grid item>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Input type='text' onChange={handleEmailChange} label="Email" />
                    </div>
                    <div>
                        <Input type='text' onChange={handlePasswordChange}  label="Password" />
                    </div>
                </form>
            </Grid> */}
            {/* <Grid item style={{ marginTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={() => handleLogin() }>Log In</Button>
            </Grid> */}
            <Grid item style={{ marginTop: '30px' }}>
                <Typography variant="h6">Don't have an acount?</Typography>
            </Grid>
            <Grid item style={{ marginTop: '10px' }}>
                <Button href="/signup" variant="contained" color="primary">Sign Up</Button>

            </Grid>
        </Grid >
    );
}