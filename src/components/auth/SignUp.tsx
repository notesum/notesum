import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography, Checkbox, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/asyncActions/authAsyncActions';
import { Close } from '@material-ui/icons'
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
    const [consent, setConsent] = useState(false);
    const [leastcharacter, setleastCharacter] = useState(false)
    const [passNumber, setpassNumber] = useState(false)
    const [lowerCase, setlowerCase] = useState(false)
    const [upperCase, setupperCase] = useState(false)
    const [symbol, setSymbol] = useState(false)




    const dispatch = useDispatch();

    // Enter submits
    function downHandler({ key }) {
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

    // Submit the user if the passwords match
    function handleSubmit() {
        if (password === passwordConf) {
            setDidntMatch(false);
            dispatch(register(name, email, password));
        } else {
            setDidntMatch(true);
        }
    }

    const handlePassChange = (event) => {
        const { value } = event.target
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (value.length > 7) setleastCharacter(true)
        if (/\d/.test(value)) console.log("passed", /\d/.test(value))
        if (/[a-z]/.test(value)) setlowerCase(true)
        if (/[A-Z]/.test(value)) setupperCase(true)
        if (format.test(value)) setSymbol(true)
        else {
            setleastCharacter(false)
            setpassNumber(false)
            setlowerCase(false)
            setupperCase(false)
            setSymbol(false)
        }

    }

    // Sign up form
    const form = (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField onChange={(event) => setName(event.target.value)} label="Username" />
            </div>
            <div>
                <TextField onChange={(event) => setEmail(event.target.value)} label="Email" />
            </div>
            <div>
                <TextField type="password" onChange={(event) => handlePassChange(event)} label="Password" />
                <div className="pass-validation">
                    <div>
                        <Typography variant="body2" className={"flex-align color-error" + leastcharacter && "success"}>
                            <Close fontSize={"small"} className="color-error" /> At least 8 characters long
                        </Typography>
                        <Typography variant="body2" className={"color-error"}>
                            <Close fontSize={"small"} className="color-error" /> Should contain:
                        </Typography>
                        <Typography variant="body2" className={"left-space flex-align color-error" + passNumber && "success"}>
                            <Close fontSize={"small"} className="color-error" /> Numbers (i.e., 0-9)
                        </Typography>
                        <Typography variant="body2" className={"left-space flex-align color-error" + lowerCase && "success"}>
                            <Close fontSize={"small"} className="color-error" /> Lower case letters (a-z)
                        </Typography>
                        <Typography variant="body2" className={"left-space flex-align color-error" + upperCase && "success"} >
                            <Close fontSize={"small"} className="color-error" /> Upper case letters (A-Z)
                        </Typography>
                        <Typography variant="body2" className={"left-space flex-align color-error" + symbol && "success"} >
                            <Close fontSize={"small"} className="color-error" /> {"At least one symbol (~, !, @, #, $, %, ^, &, *, (, ), -, _, =, +, [, ], {, }, /, ;, :, “, ,, ‘, <, >, |, ?,‘)"}
                        </Typography>
                    </div>
                </div>
            </div>
            <div>
                <TextField type="password" onChange={(event) => setPasswordConf(event.target.value)} label="Password Repeat" />
            </div>
        </form>
    );
    const isvalid = name.length && email.length && password.length && passwordConf.length
    return (
        <Box id="bg-white" m={3} >
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <Grid item>
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item>
                    {form}
                </Grid>
                <Grid item style={{ marginTop: '10px', width: "100%", display: "flex", alignItems: "center" }}>
                    <Checkbox value={consent} onChange={() => setConsent(true)} />
                    <Typography variant="subtitle2">
                        By signing up you accept our <Link href="/terms" target="_blank">terms and condition</Link>
                    </Typography>
                </Grid>
                {didntMatch &&
                    <Grid item>
                        <Typography variant="body1" color="secondary">Passwords do not match</Typography>
                    </Grid>
                }
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" disabled={!isvalid} color="primary" onMouseDown={() => handleSubmit()}>Sign Up!</Button>
                </Grid>
            </Grid >
        </Box>
    );
}