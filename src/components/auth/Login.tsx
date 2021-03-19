import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';

import { login } from '../../redux/asyncActions/authAsyncActions';

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

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(login(email, password));
    }

    // Enter submits
    function downHandler({ key }: KeyboardEvent) {
        if (key === 'Enter') {
            
            //workaround to prevent empty datafields on enter
            email = document.querySelector("#email").value;
            password = document.querySelector("#password").value;
            
            handleSubmit();
        }
    }

    // Listen for Enter
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }, []);

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
                <Grid item>
                    <Typography variant="h6"> You need to log in to access the beta test</Typography>
                </Grid>
                <Grid item>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField type="text" onChange={(event) => setEmail(event.target.value)} label="Email" />
                        </div>
                        <div>
                            <TextField type="password" onChange={(event) => setPassword(event.target.value)} label="Password" />
                        </div>
                    </form>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button target="_blank" href="/terms"><Typography variant="subtitle2">by signing up
                    you accept the terms and conditions</Typography></Button>
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
