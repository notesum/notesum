import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Grid } from "@mui/material";

import example from "../../resources/example.png";

export default function About() {
  return (
    <div className="homepage stars_bg">
      <Box my={7}>
        <Container>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontWeight: "bold", color: "#fff" }}
            gutterBottom
          >
            How it will save your time and organize your material!
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: "#fff" }}
          >
            CosmoNote is a PDF summarization tool that gives you full control of
            what you want to gather. Extract highlighted information
            automatically into a new file, which is downloadable as a word file.
            Upload any PDF to your personal storage and start summarizing.
            Annotate and comment freely in the output window on the right side.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: "#fff" }}
          >
            Easy as that!
          </Typography>
        </Container>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button variant="contained" color="primary" href="/new-project">
              Try It!
            </Button>
          </Grid>
          <Grid item>
            <img src={example} style={{ height: "55vmin" }} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
