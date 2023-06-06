import React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import ReactGA from "react-ga4";
import { Grid, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../redux/reducers";
import { deleteEmptyProject } from "../../redux/asyncActions/projectAsyncActions";
import Carousel from "./slider";
import goalImage from "../../resources/frame.png";
import Email_img from "../../resources/email-image.svg";
import laptop_img from "../../resources/laptop_img.png"
import documents_img from "../../resources/documents_img.png"

import "./App.css";
import { Link } from "react-router-dom";

// TODO(fm):
// migrate to @firebase and env and handle this properly
// works for now though
const GA_ID="GGQ8N7C10H"

function handleDeclineCookies() {
  Cookies.remove(`_ga_${GA_ID}`);
  Cookies.remove("_ga");
};

function handleAcceptCookies() {
  ReactGA.initialize(`G-${GA_ID}`, {gaOptions:{anonymizeIp: true}});
};

type AppProps = {
  loginCallback: any;
};

function App({ loginCallback }: AppProps) {
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(deleteEmptyProject());
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      //loginCallback(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <CookieConsent
        enableDeclineButton
        flipButtons
        buttonText="Akzeptieren"
        declineButtonText="Ablehnen"
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
        >
          Um nachvollziehen zu können, wie CosmoNote genutzt wird, verwenden wir Google Analytics.
          Diese Informationen sind für uns von großer Bedeutung
          um das Besucherverhalten zu verstehen und unsere Anwendung entsprechend zu verbessern.
          Zu unserem <Link to="/terms" target="_blank" style={{color: "white"}}>Datenschutz</Link>.
      </CookieConsent>
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
              Markiere was dir wichtig ist und erhalte automatisch eine editierbare und downloadbare Datei.
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
              Spare Zeit, triff Freunde, strick einen Schal. Du bestimmst!
            </p>
            <div className="documents-image-container-bottom">
              <img className = "documents-image-bottom" src ={documents_img}/>
            </div>
            <Carousel />
          </Container>
        </div>
      </div>
      <div className="wrapper-two">
        <div className="goal-section">
          <Container>
            <img src={goalImage} alt="our goal" />
            <h3>Über uns</h3>
            <p>
            Wir verstehen die studentischen Herausforderungen, vor denen du stehst. Wir waren selbst 
            unzufrieden damit, dass das Zusammenfassen von Text oft in zwei verschiedenen 
            Umgebungen stattfindet, wie etwa Adobe Reader und Word. 
            Deshalb haben wir diese Anwendungsarten kombiniert und ein einzigartiges Tool entwickelt, 
            das dir dein Leben erleichtern wird!
            </p>
          </Container>
        </div>
        <div className="goal-section" id="contact-section" style={{paddingBottom: "180px"}}>
          <Container>
            <h3>Kontakt</h3>
            <p className="c-info">
              Falls du persönlich mit uns reden willst um Ideen über die Entwicklung von CosmoNote 
              auszutauschen, unserem Team beitreten möchtest, oder ein anderes Anliegen hast:
              Schreibe uns gerne eine Email!
              </p>
              <p style={{color: "yellow"}}>
                Wir freuen uns darauf von dir zu hören und zu erfahren, was wir verbessern können!
              </p>
              <div>
                <a href="mailto:info.cosmonote@gmail.com">📧 info.cosmonote@gmail.com</a>
              </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
