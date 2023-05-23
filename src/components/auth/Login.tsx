import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid, Typography } from '@mui/material';

import { login } from '../../redux/asyncActions/authAsyncActions';

const classes = { root: `Login-root` };
const StyledBox = styled(Box)(({theme}) => ({
    [`& .${classes.root}`]: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 400,
        },
    }
}));

type LogInProps = {
    buttonCallback?: (a: boolean) => void
};

export default function Login({ buttonCallback }: LogInProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(login(email, password));
    }

    // Enter submits
    function downHandler({ key }: KeyboardEvent) {
        if (key === 'Enter') {
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
        <StyledBox m={3}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
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
                    <Typography variant="h6">Don&apos;t have an acount?</Typography>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button onMouseDown={() => buttonCallback(true)} variant="contained" color="primary">Sign Up</Button>
                </Grid>
            </Grid >
        </StyledBox>
    );
}