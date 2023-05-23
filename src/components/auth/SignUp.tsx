import React, { useEffect, useState } from 'react';
import { styled, createMuiTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid, Typography, Checkbox, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/asyncActions/authAsyncActions';
import { Close, Check } from '@mui/icons-material'

const classes = { root: `SignUp-root` };
const theme = createMuiTheme();
const StyledBox = styled(Box)(({theme}) => ({
    [`& .${classes.root}`]: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 400,
        },
    }
}));

export default function SignUp() {


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
    const [Showvalidation, setShowValidation] = useState(false)
    const [Formvalidated, setFormValdated] = useState(false)

    useEffect(() => {
        FormValidation()
    }, [consent, password])


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
        if (Formvalidated) {
            if (password === passwordConf) {
                setDidntMatch(false);
                dispatch(register(name, email, password));
            } else {
                setDidntMatch(true);
            }
        }
    }
    const passValidation = () => {
        const passValid = passNumber && lowerCase && upperCase && symbol
        return (
            <div className="pass-validation">
                <div>
                    <Typography variant="body2" className={`flex-align color-error ${leastcharacter ? "success" : ""}`}>
                        {leastcharacter ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />} At least 8 characters long
                    </Typography>
                    <Typography variant="body2" className={`flex-align color-error ${passValid ? "success" : ""}`}>
                        {passValid ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />} Should contain:
                    </Typography>
                    <Typography variant="body2" className={`left-space flex-align color-error ${passNumber ? "success" : ""}`}>
                        {passNumber ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />}Numbers (i.e., 0-9)
                    </Typography>
                    <Typography variant="body2" className={`left-space flex-align color-error ${lowerCase ? "success" : ""}`}>
                        {lowerCase ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />}Lower case letters (a-z)
                    </Typography>
                    <Typography variant="body2" className={`left-space flex-align color-error ${upperCase ? "success" : ""}`} >
                        {upperCase ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />}Upper case letters (A-Z)
                    </Typography>
                    <Typography variant="body2" className={`left-space flex-align color-error ${symbol ? "success" : ""}`} >
                        {symbol ? <Check fontSize={"small"} className="success" /> : <Close fontSize={"small"} className="color-error" />}{"At least one symbol (~, !, @, #, $, %, ^, &, *, (, ), -, _, =, +, [, ], {, }, /, ;, :, “, ,, ‘, <, >, |, ?,‘)"}
                    </Typography>
                </div>
            </div>
        )
    }

    const inpuFocus = () => {
        setShowValidation(true)
        handlePassChange(password)
    }

    const handlePassChange = (value) => {
        setPassword(value)
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (value && value.length > 7) { setleastCharacter(true) } else { setleastCharacter(false) }
        if (value && /\d+/g.test(value)) { setpassNumber(true) } else { setpassNumber(false) }
        if (value && /[a-z]/.test(value)) { setlowerCase(true) } else { setlowerCase(false) }
        if (value && /[A-Z]/.test(value)) { setupperCase(true) } else { setupperCase(false) }
        if (value && format.test(value)) { setSymbol(true) } else { setSymbol(false) }
    }

    const FormValidation = () => {
        const passValid = passNumber && lowerCase && upperCase && symbol
        console.log(passValid && consent)
        if (passValid && consent) {
            setFormValdated(true)
        } else {
            setFormValdated(false)
        }

    }

    // Sign up form
    const form = () => (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField onChange={(event) => setName(event.target.value)} label="Username" />
            </div>
            <div>
                <TextField onChange={(event) => setEmail(event.target.value)} label="Email" />
            </div>
            <div>
                <TextField type="password" autoComplete={"false"} onFocus={() => inpuFocus()} onChange={(event) => handlePassChange(event.target.value)} label="Password" />
                {Showvalidation && passValidation()}

            </div>
            <div>
                <TextField type="password" onChange={(event) => setPasswordConf(event.target.value)} label="Password Repeat" />
            </div>
        </form>
    );
    return (
        <StyledBox id="bg-white" m={3} >
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item>
                    {form()}
                </Grid>
                <Grid item style={{ marginTop: '10px', width: "100%", display: "flex", alignItems: "center" }}>
                    <Checkbox value={consent} onChange={() => { setConsent(!consent); FormValidation() }} />
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
                    <Button variant="contained" disabled={(Formvalidated) ? false : true} color="primary" onMouseDown={() => handleSubmit()}>Sign Up!</Button>
                </Grid>
            </Grid >
        </StyledBox>
    );
}
