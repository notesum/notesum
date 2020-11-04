import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Box, Grid, Card, makeStyles, Typography, Container, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import downloadImage from '../../resources/poster/download.png';
import loginImage from '../../resources/poster/login.png';
import tryMeArrow from '../../resources/poster/try-me.svg';
import eu from '../../resources/eu-law-summary.png';
import EmptyProject from '../project/EmptyProject';
import DocumentView from '../project/DocumentView';
import { NEW_FILE } from '../../redux/types/filesTypes';

import './Poster.css';

const useStyles = makeStyles({
    Card: {
        width: '90%',
        padding: '20px'
    },
});



export default function Poster() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [fileId, setFileId] = useState<string>(undefined);
    const [pdf, setPdf] = useState<Uint8Array>(undefined);

    if (fileId !== undefined && pdf !== undefined) {
        return (<DocumentView fileId={fileId} pdf={pdf}/>);
    }

    const onUpload = (file: File) => {
        (async () => {
            const id = 'poster-pdf';

            setPdf(new Uint8Array(await file.arrayBuffer()));

            dispatch({
                type: NEW_FILE,
                payload: {
                    id,
                    title: file.name,
                    pdf: ''
                }
            });

            setFileId(id);
        })();
    };

    return (
        <Container maxWidth="xl">
            <Grid spacing={7} direction="column" alignContent="center" alignItems="center">
                <Grid item>
                    <Fade>
                        <Box my={7}>
                            <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: 'bold' }}>
                                NoteSum
                            </Typography>
                            <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                                A Productivity Application
                            </Typography>
                            <Typography variant="h6" align="center" color="textPrimary" gutterBottom style={{ fontStyle: 'italic' }}>
                                Summarize PDF documents on the same page as you read them, with the most intuitive way for you to not loose focus
                            </Typography>
                        </Box>
                    </Fade>
                </Grid>
                <Grid item>
                    <Grid container justify="center" alignContent="center" alignItems="center">
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Fade>
                                    <Card elevation={3} className={classes.Card}>
                                        <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                                            Goals
                                        </Typography>
                                        <Typography variant="body1" style={{ lineHeight: '1.6' }}>
                                            <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                                <li>
                                                    Make life easier for students to study using PDF documents
                                            </li>
                                                <li>
                                                    Create a product that is scalable and reliable
                                            </li>
                                                <li>
                                                    Provide the right balance between design and functionality
                                            </li>
                                                <li>
                                                    Make a product that is intuitive and functional
                                            </li>
                                            </ul>
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Fade>
                                    <Card elevation={3} className={classes.Card}>
                                        <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                                            Idea
                                        </Typography>
                                        <Typography variant="body1">
                                            <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                                <li>
                                                    A split screen with both the PDF and the summary
                                            </li>
                                                <li>
                                                    Individual accounts for users to save their work
                                            </li>
                                                <li>
                                                    Fully functional editor to overcome using another program
                                            </li>
                                                <li>
                                                    Professional grade PDF renderer, with excellent compatibility
                                            </li>
                                            </ul>
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mx={3}>
                                <Fade>
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
                                                    Editor built with draft.js and PDF renderer built with pdf.js
                                            </li>
                                                <li>
                                                    Reliable local state management with redux.js
                                            </li>
                                                <li>
                                                    Backend built to last with Laravel and MySQL
                                            </li>
                                            </ul>
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Fade>
                        <Box my={5}>
                            <Grid container spacing={7}>
                                <Grid item xs={5} justify="center" >
                                    <Box mx={7} my={3}>
                                        <img src={loginImage} style={{ width: 'auto', maxHeight: '450px' }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={7}>
                                    <Box m={4}>
                                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                            Make a personal account to keep everything safe and intact
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
                    </Fade>
                </Grid>
                <Grid item>
                    <Fade>
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
                                                    Upload any size PDF document without delay
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
                                    {/* <img src={poster3} style={{ width: '80%' }} /> */}
                                    <EmptyProject addFile={onUpload} />
                                    <img src={tryMeArrow} alt="Try me!" className="tryMe" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Grid>
                <Grid item>
                    <Fade>
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
                                            Start summarizing your documents on the webpage
                                        </Typography>
                                    </Box>
                                    <Box m={4}>
                                        <Typography variant="body1" style={{ lineHeight: '1.5', fontSize: 'large' }}>
                                            All you have to do is highlight text on your document or book and it
                                            will automatically be added to the summary. Is there a diagram you want to remember?
                                            You can make a screen grab on the page itself! Do you want extra structure? You can
                                            have different titles and bullet point lists.
                                        </Typography>
                                    </Box>
                                    <Box mx={7}>
                                        <Typography variant="body1">
                                            <ul style={{ lineHeight: '2.5', fontSize: 'large' }}>
                                                <li>
                                                    Responsive and efficient PDF renderer
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
                    </Fade>
                </Grid>
                <Grid item>
                    <Fade>
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
                                            If you have finished your summary, NoteSum gives you the ability to download the entire summary
                                            to a file format of your choosing. This can be a Word document, a PDF or if you like living
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
                                                    Keep all your styling, images and structures intact
                                            </li>
                                                <li>
                                                    Want to summarize more? Reupload the PDF and summurize that!
                                            </li>
                                            </ul>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5} justify="center" >
                                    {/* <img src={downloadImage} style={{ width: 'auto', maxHeight: '343px', margin: '0 auto 0 auto' }} /> */}
                                    <Card elevation={3} style={{
                                        width: '300px',
                                        margin: '0 auto 0 auto'
                                    }}>
                                        <Box m={2} overflow="hidden">
                                            <Grid container wrap="wrap" direction="column">
                                                <Grid item xs>
                                                    <TextField id="filled-helperText" value={'Europe and the World'} label="File Name"
                                                        onChange={() => null} />
                                                </Grid>
                                                <Grid item xs>
                                                    <Button onMouseDown={() => null}>Save as PDF</Button>
                                                </Grid>
                                                <Grid item xs>
                                                    <Button onMouseDown={() => null}>Save as Word Document</Button>
                                                </Grid>
                                                <Grid item xs>
                                                    <Button onMouseDown={() => null}>Save as HTML</Button>
                                                </Grid>
                                                <Grid item xs>
                                                    <Button onMouseDown={() => null}>Save as Text Document</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Grid>
            </Grid>
        </Container>
    );

}