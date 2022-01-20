import React from "react";
import { Grid, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../redux/reducers";
import { deleteEmptyProject } from "../../redux/asyncActions/projectAsyncActions";
import Carousel from "./slider";
import goalImage from "../../resources/frame.png";
import Email_img from "../../resources/email-image.svg";
import mapicon from "../../resources/map-pin.svg";

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
            <h2>From Unstructured Information to complete Knowledge</h2>
            <div className="banner-bottom-text-wrapper">
              <h3 className="banner-footer-txt">
                CosmoNote is an easy to use PDF summarization tool that gives you full control over the information you want to collect
              </h3>
            </div>
            {isLoggedIn ? <Link className="banner-cta" to="/projects"> Try It </Link> : <Link className="banner-cta" to="/new-project"> Try It </Link>}


          </div>
        </Container>
        <div className="video-slider-sec">
          <Container>
            <h3>How it will save you time and organize your material</h3>
            <p>
              Upload a PDF and highlight the information you think is important. The marked text is then automatically copied into a new, editable, and downloadable file.
              <span>Easy as that!</span>
            </p>
            <Carousel />
          </Container>
        </div>
      </div>
      {/* goal section */}
      <div className="wrapper-two">
        <div className="goal-section">
          <Container>
            <img src={goalImage} alt="our goal" width="100px" height="100px" />
            <h3>Our Goal</h3>
            <p>
              We believe that time is one of the most valuable assets one can
              have and that it is a real challenge to spend it wisely. <br />{" "}
              <br />
              With CosmoNote you can create your summary simultaneously while
              reading your material and have it organized and ready to be
              further processed.
            </p>
            <a href="/about" className="banner-cta">
              How it Works
            </a>

          </Container>
        </div>
        <div className="contact-sec" id="contact-section">
          <Container>
            <h3>Contact Us</h3>
            <Grid container spacing={8} className="ct-inner">
              <Grid item md={6}>
                <p className="c-info">
                  Currently, we are based in the Incubase on the University of
                  Twente campus. You can reach us at the address below
                </p>
                <div className="e-mail">
                  <img src={Email_img} alt="mail" width="30px" height="24px" />
                  <p>info.cosmonote@gmail.com</p>
                </div>
                <div className="location">
                  <img src={mapicon} alt="location" width="30px" height="36px" />
                  <p>
                    De Hems 10 <br />
                    7522 AN Enschede <br />
                    The Netherlands
                  </p>
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
