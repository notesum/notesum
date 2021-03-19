import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { register } from '../../redux/asyncActions/authAsyncActions';

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

export default function SignUp() {
    const classes = useStyles();

    // Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [didntMatch, setDidntMatch] = useState(false);

    const dispatch = useDispatch();

    // Enter submits
    function downHandler({ key }) {
        if (key === 'Enter') {
            
            //workaround to prevent empty datafields on enter
            name = document.querySelector("#nameSignUp").value;
            email = document.querySelector("#emailSignUp").value;
            password = document.querySelector("#passwordSignUp").value;
            passwordConf = document.querySelector("#passwordConfSignUp").value;
            
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

    // Submit the user if the passwords match
    function handleSubmit() {
        if (password === passwordConf) {
            setDidntMatch(false);
            dispatch(register(name, email, password));
        } else {
            setDidntMatch(true);
        }
    }

    // Sign up form
    const form = (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField id="nameSignUp" onChange={(event) => setName(event.target.value)} label="Name" />
            </div>
            <div>
                <TextField id="emailSignUp" onChange={(event) => setEmail(event.target.value)} label="Email" />
            </div>
            <div>
                <TextField type="password" id="passwordSignUp" onChange={(event) => setPassword(event.target.value)} label="Password" />
            </div>
            <div>
                <TextField type="password" id="passwordConfSignUp" onChange={(event) => setPasswordConf(event.target.value)} label="Password Repeat" />
            </div>
        </form>
    );

    return (
        <Box m={3}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <Grid item>
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item>
                    {form}
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button target="_blank" href="/terms" variant="text"><Typography variant="subtitle2">by siging up
                        in you accept the terms and conditions</Typography></Button>
                </Grid>
                {didntMatch &&
                    <Grid item>
                        <Typography variant="body1" color="secondary">Please make sure the password matches the repeat</Typography>
                    </Grid>
                }
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="primary" onMouseDown={() => handleSubmit()}>Sign Up!</Button>
                </Grid>
            </Grid >
        </Box>
    );
}
