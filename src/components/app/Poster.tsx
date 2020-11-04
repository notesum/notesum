import React from 'react';
import { Box, Grid, Card, makeStyles, Typography, Container } from '@material-ui/core';

import poster3 from '../../resources/poster3.png';
import eu from '../../resources/eu-law-summary.png';


const useStyles = makeStyles({
    Card: {
        width: '90%',
        padding: '20px'
    },
});



export default function Poster() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Grid spacing={7} direction="column" alignContent="center" alignItems="center">
                <Grid item>
                    <Box my={7}>
                        <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: 'bold' }}>
                            NoteSum
                        </Typography>
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                            A Productivity Application
                        </Typography>
                        <Typography variant="h6" align="center" color="textPrimary" gutterBottom style={{ fontStyle: 'italic' }}>
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
                <Grid item>
                    <Box my={5}>
                        <Grid container spacing={7}>
                            <Grid item xs={5} justify="center" >
                                <Box mx={7} my={3}>
                                    <img src={eu} style={{ width: '100%' }} /> //TODO: Log in and sign up
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box m={4}>
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        Make a personal account to keep verything safe and intact
                                    </Typography>
                                </Box>
                                <Box m={4}>
                                    <Typography variant="body1" style={{ lineHeight: '1.5', fontSize: 'large' }}>
                                        NoteSum gives you the ability to make a personal account where your information is kept,
                                        secret and secure. We make sure only you have access to your data and we also make certain that
                                        your data will not be lost.
                                    </Typography>
                                </Box>
                                <Box mx={7}>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Password protected account
                                        </li>
                                            <li>
                                                Tied to your email for safety
                                        </li>
                                            <li>
                                                Exteremly easy to sign up
                                        </li>
                                            <li>
                                                Stay logged in for your pleasure
                                        </li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box my={7}>
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <Box m={4}>
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        Upload your book or classnotes to NoteSum and structure them
                                    </Typography>
                                </Box>
                                <Box m={4}>
                                    <Typography variant="body1" style={{ lineHeight: '1.5', fontSize: 'large' }}>
                                        Create a new project by using the intuitive UI, name it
                                        something useful, and then upload your resources to the
                                        project. From this point on all your documents will be automatically saved on our server for your convenience.
                                    </Typography>
                                </Box>
                                <Box mx={7}>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Create unlimited amount of projects
                                        </li>
                                            <li>
                                                Upload any size Pdf document without delay
                                        </li>
                                            <li>
                                                Carry on where you left off easily
                                        </li>
                                            <li>
                                                Combine subjects in projects for structure
                                        </li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={5} justify="center" >
                                <img src={poster3} style={{ width: '80%' }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box my={5}>
                        <Grid container spacing={7}>
                            <Grid item xs={5} justify="center" >
                                <Box mx={7} my={3}>
                                    <img src={eu} style={{ width: '100%' }} />
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box m={4}>
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        Start summurizing your documents on the webpage
                                    </Typography>
                                </Box>
                                <Box m={4}>
                                    <Typography variant="body1" style={{ lineHeight: '1.5', fontSize: 'large' }}>
                                        All you have to do is highligh text on your document or book and it
                                        will automatically be added to the summary. Is there a disgaram you want to remember?
                                        You can make a screen grab on the page itself! Do you want extra structure? You can
                                        have different titles and bullet point lists.
                                    </Typography>
                                </Box>
                                <Box mx={7}>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Responsive and efficient Pdf renderer
                                        </li>
                                            <li>
                                                Editing with many style options and possibilities
                                        </li>
                                            <li>
                                                Automatic syncronization with our server
                                        </li>
                                            <li>
                                                Effortlessly put your diagrams and pictures into your summary
                                        </li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box my={7}>
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <Box m={4}>
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        Finally when you are done, download it however you like!
                                    </Typography>
                                </Box>
                                <Box m={4}>
                                    <Typography variant="body1" style={{ lineHeight: '1.5', fontSize: 'large' }}>
                                        If you have finishged your summary, NoteSum gives you the ability to download the entire summary
                                        to a file format of your choosing. This can be a Word document, a Pdf or if you like living
                                        the dangerous life, you can even make it an HTML document.
                                    </Typography>
                                </Box>
                                <Box mx={7}>
                                    <Typography variant="body1">
                                        <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                            <li>
                                                Download locally without any delay
                                        </li>
                                            <li>
                                                Kepp all your styling, images and structures intact
                                        </li>
                                            <li>
                                                Want to summurize more? Reupload the Pdf and summurize that!
                                        </li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={5} justify="center" >
                                <img src={poster3} style={{ width: '80%' }} /> // TODO: downoad and maybe a picture of pdf reader with a summary
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

}