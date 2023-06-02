import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../redux/reducers";
import { deleteEmptyProject } from "../../redux/asyncActions/projectAsyncActions";
import Carousel from "./slider";
import goalImage from "../../resources/frame.png";
import Email_img from "../../resources/email-image.svg";
import mapicon from "../../resources/map-pin.svg";
import laptop_img from "../../resources/laptop_img.png"
import documents_img from "../../resources/documents_img.png"
import documentsInFrontOfLaptop from "../../resources/documentsInFrontOfLaptop.png"
import documentBlack from "../../resources/documentBlack.png"

import "./App.css";
import { Link } from "react-router-dom";


type AppProps = {
  loginCallback: any;
};

function App({ loginCallback }: AppProps) {
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(deleteEmptyProject());
  }, []);

  // If someone is not logged in and the page is reloaded, show the dialog
  React.useEffect(() => {
    if (!isLoggedIn) {
      //loginCallback(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="homepage">
        <Container>
            <div className="home-banner">
              <h2>PDFs Zusammenfassen. <br /> Ganz Einfach.</h2>

            <div className="laptop-container">
              <img className = "laptop-image" src ={laptop_img}/>
            </div>

            <div className="documents-container">
              <img className = "documents-image-top" src ={documents_img}/>
            </div>


            <div className="banner-bottom-text-wrapper">
              <h3 className="banner-footer-txt">
              Markiere, was dir wichtig ist, und erhalte automatisch eine editierbare und downloadbare Datei.
              </h3>
            </div>
            {isLoggedIn ? <Link className="banner-cta" to="/projects"> Ausprobieren </Link> : <Link className="banner-cta" to="/new-project"> Ausprobieren </Link>}

          </div>
        </Container>
        <div className="video-slider-sec">
          <Container>
            <h3>Extrahiert Text automatisch während des Markierens</h3>
            <p>
              Mach dein Leben einfacher:
              Spare Zeit, triff Freunde, Nähe einen Schal. Du bestimmst!
            </p>
            <div className="documents-image-container-bottom">
              <img className = "documents-image-bottom" src ={documents_img}/>
            </div>
            <Carousel />
          </Container>
        </div>
      </div>
      {/* goal section */}
      <div className="wrapper-two">
        <div className="goal-section">
          <Container>
            <img src={goalImage} alt="our goal" />
            <h3>Über uns</h3>
            <p>
            Wir verstehen die studentischen Herausforderungen, vor denen du stehst. Wir waren selbst 
            unzufrieden damit, dass das Zusammenfassen von Text oft in zwei verschiedenen 
            Umgebungen stattfindet, wie beispielsweise Adobe Reader und Word nebeneinander. 
            Deshalb haben wir diese Anwendungsarten kombiniert und ein einzigartiges Tool entwickelt, 
            das dir das Leben erleichtert.
            </p>
            {/* 
            
            <a href="/about" className="banner-cta-howItWorks">
              Anleitung
            </a>

            //Not needed for now. Enough Info on Landing Page. Vide Explains how it works.
            
            */}


          </Container>
        </div>
        <div className="contact-sec" id="contact-section">
          <Container>
            <h3>Kontakt</h3>
            <Grid container spacing={8} className="ct-inner">
              <Grid item md={6}>
                <p className="c-info">
                  Falls du persönlich mit uns reden willst um Ideen über die Entwicklung von CosmoNote 
                  auszutauschen, unserem Team beitreten möchtest oder ein anderes Anliegen hast,
                  schreibe uns gerne eine Email. <br></br>
                  <span className ="blue-text">
                    Wir Freuen uns darauf von dir zu höhren und von deinem 
                    Feedback zu lernen, was wir verbessern können!
                  </span>
                </p>
                <div className="e-mail">
                  <img src={Email_img} alt="mail" />
                  <p style={{ fontSize: '30px' }}>info.cosmonote@gmail.com</p>
                  <p style={{ fontSize: '17px' }}>Made with <span id="heart">&#9829;</span> von Studenten der Westfälischen Hochschule, Gelsenkirchen</p>
                </div>
              </Grid>
              {/* <Grid item md={6} style={{ marginLeft: "auto" }}>
                <form className="ct-form">
                  <input type="text" placeholder="First Name" />
                  <input type="email" placeholder="Email" />
                  <textarea placeholder="Your message"></textarea>
                  <button>Send</button>
                </form>
              </Grid> */}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
