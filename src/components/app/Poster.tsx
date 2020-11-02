import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    Card: {
        width: '90%',
        padding: '20px'
    },
});



export default function Poster() {
    const classes = useStyles();

    return (
        <div>
            <Grid spacing={7} direction="column" alignContent="center" alignItems="center">
                <Grid item>
                    <Box my={7}>
                        <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: 'bold' }}>
                            NoteSum
                        </Typography>
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                            A Productivity Application
                        </Typography>
                        <Typography variant="h6" align="center" color="textPrimary" gutterBottom style={{fontStyle: 'italic'}}>
                            Summarize Pdf documents on the same page as you read them, with the most intuitional way for you to not loose focus
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Grid container justify="center" alignContent="center" alignItems="center">
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Card elevation={3} className={classes.Card}>
                                    <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                                        Goals
                                    </Typography>
                                    <Typography variant="body1" style={{ lineHeight: '1.6' }}>
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Make life easy for students to study using Pdf documents
                                        </li>
                                            <li>
                                                Create a product that is scalable and reliable
                                        </li>
                                            <li>
                                                Provide the right balance between design and functionality
                                        </li>
                                            <li>
                                                Make a product that is intuitional and functional
                                        </li>
                                        </ul>
                                    </Typography>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Card elevation={3} className={classes.Card}>
                                    <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                                        Idea
                                    </Typography>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                A split screen with both the Pdf and the summary
                                        </li>
                                            <li>
                                                Individual accounts for users to save their work
                                        </li>
                                            <li>
                                                Fully functional editor to overcome using another program
                                        </li>
                                            <li>
                                                Professional grade Pdf renderer, with exellent compatibility
                                        </li>
                                        </ul>
                                    </Typography>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Card elevation={3} className={classes.Card}>
                                    <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                                        Execution
                                    </Typography>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Website built with react.js and material design
                                        </li>
                                            <li>
                                                Editor built with draft.js and Pdf renderer built with pdf.js
                                        </li>
                                            <li>
                                                Reliable state local state management with redux.js
                                        </li>
                                            <li>
                                                Backend built to last with Laravel and MySQL
                                        </li>
                                        </ul>
                                    </Typography>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )

}