import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { register } from '../../redux/asynchActions/authAsynchActions';

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const dispatch = useDispatch();

    function handleSubmit() {
        if (password === passwordConf) {
            dispatch(register(name,email,password));
        }
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
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField onChange={(event) => setName(event.target.value)} label="Name" />
                        </div>
                        <div>
                            <TextField onChange={(event) => setEmail(event.target.value)} label="Email" />
                        </div>
                        <div>
                            <TextField type="password" onChange={(event) => setPassword(event.target.value)} label="Password" />
                        </div>
                        <div>
                            <TextField type="password" onChange={(event) => setPasswordConf(event.target.value)} label="Password Repeat" />
                        </div>
                    </form>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="primary"onMouseDown={() => handleSubmit()}>Sign Up!</Button>
                </Grid>
            </Grid >
        </Box>
    );
}