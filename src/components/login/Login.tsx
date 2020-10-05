import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';

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
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField label="User Name" />
                    </div>
                    <div>
                        <TextField label="Password" />
                    </div>
                </form>
            </Grid>
            <Grid item style={{ marginTop: '30px' }}>
                <Typography variant="h6">Don't have an acount?</Typography>
            </Grid>
            <Grid item style={{ marginTop: '10px' }}>
                <Button href='/signup' variant="contained" color="primary">Sign Up</Button>

            </Grid>
        </Grid >
    );
}