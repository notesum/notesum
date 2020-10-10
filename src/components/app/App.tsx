import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, Card, CardMedia, CardContent, makeStyles } from '@material-ui/core';

import higlight from '../../resources/higlight.jpg';
import work from '../../resources/work.jpg';

import './App.css';

const useStyles = makeStyles({
    Card: {
        height: '400px',
        minWidth: '300px'
    },
    Media: {
        height: 400,
        minWidth: 600
    },
    Content: {
        margin: 30,
        maxHeight: '300px'
    },
    But: {
        marginTop: '2vh',
    }
});

function App() {
    const classes = useStyles();
    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container spacing={7} justify="center" direction="column" alignContent="center" alignItems="center" >
                <Grid item>
                    <Box my={7}>
                        <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: 'bold' }}>
                            Welcome to the NoteSum beta test!
                        </Typography>
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                            From Unstructured Information To Complete Knowledge
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Grid container spacing={7} justify="center" alignContent="center" alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <Card elevation={3} className={classes.Card}>
                                <CardContent className={classes.Content}>
                                    <Typography variant="h5" color="textPrimary" gutterBottom>
                                        Our Goal
                                </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        We believe that time is one of the most valuable assets one can have and it is a real challenge to spend it wisely.
                                        With NoteSum you can create your summary simultaneously while reading your material and have it organised and ready
                                        to be further processed.
                                </Typography>
                                    <Button className={classes.But} variant="contained" color="primary" href="/about">How It Works</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.Card}>
                                <CardMedia
                                    className={classes.Media}
                                    image={higlight}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={1} />

                    </Grid>

                </Grid>
                <Grid item>
                    <Grid container spacing={7} justify="center" alignContent="center" alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <Card className={classes.Card}>
                                <CardMedia
                                    className={classes.Media}
                                    image={work}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card elevation={3} className={classes.Card}>
                                <CardContent className={classes.Content}>
                                    <Typography variant="h5" color="textPrimary" gutterBottom>
                                        Beta Testing
                                </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        We are working towards a collaborative learning-network that will save your time and
                                        help you to aquire the right knowledge in time.
                                        The NoteSum Beta has started!  Click on the Try It Out button to join us
                                        on our journey to create a great and helpful application!
                                </Typography>
                                    <Button className={classes.But} variant="contained" color="primary" href="/projects">Try Now</Button>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>

                </Grid>
                <Grid item>
                    <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                        Contact
                    </Typography>
                </Grid>
                <Grid item style={{ marginBottom: '40px' }}>
                    <Grid container spacing={7} justify="center" alignContent="center" alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={4} >
                            <Card elevation={3} className={classes.Card}>
                                <CardContent className={classes.Content}>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        Currently we are based in the Incubase on the University of Twente campus. You can reach us at the address below
                                    </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        Email: info.notesum@gmail.com
                                        </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        De Hems 10
                                        </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        7522 AN Enschede
                                        </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        The Netherlands
                                        </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4} >
                            <Card className={classes.Card}>
                                <iframe height="400" width="600" style={{ borderStyle: 'none' }}
                                    src="https://maps.google.com/maps?q=incubase%20twente&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                            </Card>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
