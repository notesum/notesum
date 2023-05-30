import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Grid } from "@mui/material";

import example from "../../resources/example.png";

export default function About() {
  return (
    <div className="homepage about_page_background">
      <Box my={7}>
        <Container>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontWeight: "bold", color: "#fff" }}
            gutterBottom
          >
           Zeit: Gespart. Effiziens: Erhöht.
          </Typography>
          <Typography
            variant="h6"
            align="left"
            color="textSecondary"
            paragraph
            style={{ color: "#fff" }}
          >
          <p>
            Mit unserem PDF Zusammenfassungstool wird das Zusammenfassen von wichtigen Informationen zu einem Kinderspiel.
            Egal, ob du ein Student bist, der viel mit digitalem Text arbeitet, oder jemand, der
            regelmäßig PDF-Dokumente analysiert – wir haben die perfekte Lösung für dich. 
            <br></br>
            Markiertes wird automatisch in eine editierbare und downloadbare Datei kopiert.
            <br></br>
            Das Ergebnis? Eine übersichtliche und personalisierte Zusammenfassung, die du direkt herunterladen kannst.
          </p>
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: "#fff" }}
          >
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
              PDF Hochladen und Markieren
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
