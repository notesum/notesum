import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Fade from "react-reveal/Fade";
import { Box, Grid, Card, Typography, Container, TextField, Button, Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import tryMeArrow from "../../resources/poster/try-me.svg";
import eu from "../../resources/eu-law-summary.png";
import EmptyProject from "../project/EmptyProject";
import DocumentView from "../project/DocumentView";
import { NEW_FILE } from "../../redux/types/filesTypes";

import "./Poster.css";

const PREFIX = 'Poster';

const classes = {
  Card: `${PREFIX}-Card`,
  root: `${PREFIX}-root`
};

const StyledContainer = styled(Container)((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.Card}`]: {
    width: "90%",
    padding: "20px",
    height: "330px",
  },

  [`& .${classes.root}`]: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 400,
    },
  }
}));

export default function Poster() {


  const dispatch = useDispatch();
  const [fileId, setFileId] = useState<string>(undefined);
  const [pdf, setPdf] = useState<Uint8Array>(undefined);

  if (fileId !== undefined && pdf !== undefined) {
    return <DocumentView fileId={fileId} pdf={pdf} />;
  }

  const onUpload = (file: File) => {
    (async () => {
      const id = "poster-pdf";

      setPdf(new Uint8Array(await file.arrayBuffer()));

      dispatch({
        type: NEW_FILE,
        payload: {
          id,
          title: file.name,
          pdf: "",
        },
      });

      setFileId(id);
    })();
  };

  return (
    <StyledContainer maxWidth="xl" className="terms">
      <Grid
        spacing={7}
        direction="column"
        alignContent="center"
        alignItems="center"
      >
        <Grid item>
          <Fade>
            <Box my={7}>
              <Typography
                variant="h3"
                align="center"
                color="textPrimary"
                style={{ fontWeight: "bold" }}
              >
                CosmoNote
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                A Productivity Application
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textPrimary"
                gutterBottom
                style={{ fontStyle: "italic" }}
              >
                Summarize PDF documents on the same page as you read them, with
                the most intuitive way for you to not lose focus
              </Typography>
            </Box>
          </Fade>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Box mx={3}>
                <Fade>
                  <Card elevation={3} className={classes.Card}>
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      Goals
                    </Typography>
                    <Typography variant="body1" style={{ lineHeight: "1.6" }}>
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>
                          Make life easier for students to study using PDF
                          documents
                        </li>
                        <li>Create a product that is scalable and reliable</li>
                        <li>
                          Provide the right balance between design and
                          functionality
                        </li>
                        <li>Make a product that is intuitive and functional</li>
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
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      Idea
                    </Typography>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>
                          A split screen with both the PDF and the summary
                        </li>
                        <li>
                          Individual accounts for users to save their work
                        </li>
                        <li>
                          Fully functional editor to overcome using another
                          program
                        </li>
                        <li>
                          Professional grade PDF renderer, with excellent
                          compatibility
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
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      Execution
                    </Typography>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>Website built with React and material design</li>
                        <li>
                          Editor built with Draft.js and PDF renderer built with
                          PDF.js
                        </li>
                        <li>
                          Reliable state management with Redux and Laravel
                        </li>
                        <li>Safe and stable code by using TypeScript</li>
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
                <Grid item xs={6} justifyContent="center">
                  <Box mx={7} my={3}>
                    <Card
                      elevation={24}
                      style={{
                        width: "500px",
                        margin: "0 auto 0 auto",
                      }}
                    >
                      <Box m={3}>
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
                            <Typography variant="h6">
                              {" "}
                              You need to log in to access the beta test
                            </Typography>
                          </Grid>
                          <Grid item>
                            <form
                              className={classes.root}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField type="text" label="Email" />
                              </div>
                              <div>
                                <TextField type="password" label="Password" />
                              </div>
                            </form>
                          </Grid>
                          <Grid item style={{ marginTop: "10px" }}>
                            <Button target="_blank" href="/terms">
                              <Typography variant="subtitle2">
                                By signing up you accept our terms and condition
                              </Typography>
                            </Button>
                          </Grid>
                          <Grid item style={{ marginTop: "10px" }}>
                            <Button variant="contained" color="primary">
                              Log In
                            </Button>
                          </Grid>

                          <Grid item style={{ marginTop: "30px" }}>
                            <Typography variant="h6">
                              Don't have an acount?
                            </Typography>
                          </Grid>
                          <Grid item style={{ marginTop: "10px" }}>
                            <Button variant="contained" color="primary">
                              Sign Up
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box m={4}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      Make a personal account to keep everything safe and intact
                    </Typography>
                  </Box>
                  <Box m={4}>
                    <Typography
                      variant="body1"
                      style={{ lineHeight: "1.5", fontSize: "large" }}
                    >
                      CosmoNote gives you the ability to make a personal account
                      where your information is kept, secret and secure. We make
                      sure only you have access to your data and we also make
                      certain that your data will not be lost.
                    </Typography>
                  </Box>
                  <Box mx={7}>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>Password protected account</li>
                        <li>Tied to your email for safety</li>
                        <li>Quick and easy sign up</li>
                        <li>Easily share documents between devices</li>
                      </ul>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <div
            style={{
              margin: "0 auto 0 auto",
              width: 40,
            }}
          >
            <ArrowDownwardIcon
              style={{ fontSize: 40, textAlign: "center", color: "#3f51b5" }}
            />
          </div>
        </Grid>
        <Grid item>
          <Fade>
            <Box my={7}>
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <Box m={4}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      Upload your book or classnotes to CosmoNote and structure
                      them
                    </Typography>
                  </Box>
                  <Box m={4}>
                    <Typography
                      variant="body1"
                      style={{ lineHeight: "1.5", fontSize: "large" }}
                    >
                      Create a new project by using the intuitive UI, name it
                      something useful, and then upload your resources to the
                      project. From this point on all your documents will be
                      automatically saved on our server for your convenience.
                    </Typography>
                  </Box>
                  <Box mx={7}>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>Create unlimited amount of projects</li>
                        <li>Upload any size PDF document without delay</li>
                        <li>Carry on where you left off easily</li>
                        <li>Combine subjects in projects for structure</li>
                      </ul>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5} justifyContent="center">
                  {/* <img src={poster3} style={{ width: '80%' }} /> */}
                  <EmptyProject addFile={onUpload} />
                  <img src={tryMeArrow} alt="Try me!" className="tryMe" />
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <div
            style={{
              margin: "70px auto 0 auto",
              width: 40,
            }}
          >
            <ArrowDownwardIcon
              style={{ fontSize: 40, textAlign: "center", color: "#3f51b5" }}
            />
          </div>
        </Grid>
        <Grid item>
          <Fade>
            <Box my={5}>
              <Grid container spacing={7}>
                <Grid item xs={5} justifyContent="center">
                  <Box mx={7} my={3}>
                    <img src={eu} style={{ width: "100%" }} />
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <Box m={4}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      Start summarizing your documents!
                    </Typography>
                  </Box>
                  <Box m={4}>
                    <Typography
                      variant="body1"
                      style={{ lineHeight: "1.5", fontSize: "large" }}
                    >
                      All you have to do is highlight text on your document or
                      book and it will automatically be added to the summary. Is
                      there a diagram you want to remember? You can make a
                      screen grab on the page itself! Do you want extra
                      structure? You can have different titles and bullet point
                      lists.
                    </Typography>
                  </Box>
                  <Box mx={7}>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>Responsive and efficient PDF renderer</li>
                        <li>
                          Editing with many style options and possibilities
                        </li>
                        <li>Automatic synchronization with our server</li>
                        <li>
                          Effortlessly put your diagrams and pictures into your
                          summary
                        </li>
                      </ul>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <div
            style={{
              margin: "0 auto 0 auto",
              width: 40,
            }}
          >
            <ArrowDownwardIcon
              style={{ fontSize: 40, textAlign: "center", color: "#3f51b5" }}
            />
          </div>
        </Grid>
        <Grid item>
          <Fade>
            <Box my={7}>
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <Box m={4}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      Finally when you are done, download it however you like
                    </Typography>
                  </Box>
                  <Box m={4}>
                    <Typography
                      variant="body1"
                      style={{ lineHeight: "1.5", fontSize: "large" }}
                    >
                      If you have finished your summary, CosmoNote gives you the
                      ability to download the entire summary to a file format of
                      your choosing. This can be a Word document, a PDF or if
                      you like living the dangerous life, you can even make it
                      an HTML document.
                    </Typography>
                  </Box>
                  <Box mx={7}>
                    <Typography variant="body1">
                      <ul style={{ lineHeight: "2.5", fontSize: "large" }}>
                        <li>Download locally without any delay</li>
                        <li>
                          Keep all your styling, images and structures intact
                        </li>
                        <li>Share your summary with your fellow classmates</li>
                        <li>
                          Want to summarize more? Reupload the PDF and summarize
                          that!
                        </li>
                      </ul>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5} justifyContent="center">
                  <Card
                    elevation={24}
                    style={{
                      width: "300px",
                      margin: "0 auto 0 auto",
                    }}
                  >
                    <Box m={2} overflow="hidden">
                      <Grid container wrap="wrap" direction="column">
                        <Grid item xs>
                          <TextField
                            id="filled-helperText"
                            value={"Europe and the World"}
                            label="File Name"
                            onChange={() => null}
                          />
                        </Grid>
                        <Grid item xs>
                          <Button onMouseDown={() => null}>Save as PDF</Button>
                        </Grid>
                        <Grid item xs>
                          <Button onMouseDown={() => null}>
                            Save as Word Document
                          </Button>
                        </Grid>
                        <Grid item xs>
                          <Button onMouseDown={() => null}>Save as HTML</Button>
                        </Grid>
                        <Grid item xs>
                          <Button onMouseDown={() => null}>
                            Save as Text Document
                          </Button>
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
    </StyledContainer>
  );
}
