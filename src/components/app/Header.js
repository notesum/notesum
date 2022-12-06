import React from "react";
import { Container, Button } from "@material-ui/core";
import Donation from "../../resources/donation.svg";
import Logo from "../../resources/frame.png";
import LogoText from "../../resources/CosmoNote.svg";
import feedback from "../../resources/feedback.svg";
import info from "../../resources/info.svg";
import user from "../../resources/user.svg";

import AuthIcon from "../auth/AuthIcon";
import { Link, useLocation, has } from "react-router-dom";
import background from "../../resources/background.jpg";
import Terms from "../../resources/terms.png";
import Contact from "../../resources/open.png";
import { HashLink } from 'react-router-hash-link';


const Header = () => {
  const location = useLocation();
  return (
    <header
      className="header"
      style={
        location.pathname.includes("/project/") || location.pathname.includes("/new-project")
          ? { position: "static", backgroundImage: `url(${background})` }
          : {}
      }
    >
      <Container style={{ maxWidth: 1678, width: "80%" }}>
        <div className="header-inner">
          <div className="logo">
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="cosmonote"
                style={{ maxWidth: 60, marginRight: 20 }}
              />
              <img src={LogoText} alt="cosmonote" />
            </Link>
          </div>
          <div className="nav__bar">
            <ul className="list-unstyled">
              <li>
                <Button
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScBYJsVfzZAcBAGlYNIvgiOnQE4yI-vaJEo66T7oMW9-lXD5w/viewform"
                >
                  <img src={feedback} alt="" />
                  <p>Feedback</p>
                </Button>
              </li>
              <li>
                {/* <a href="#">
                  <img src={user} alt="" />
                </a> */}
                <AuthIcon />
              </li>

              {location.pathname.includes("/project/") ?
                <>
                  <li>
                    <Button
                        target="_blank"
                        href="https://www.paypal.com/donate/?hosted_button_id=BTJE5YVKQXVLC"
                    >
                      <img src={Donation} style={{ maxWidth: 32, filter: "invert(1)" }} alt="" />
                      <p>Donate</p>
                    </Button>
                  </li>
                  <li>
                    <Link to="/terms" target="_blank">
                      <img src={Terms} style={{ maxWidth: 32, filter: "invert(1)" }} alt="" />
                      <p>Terms and Conditions</p></Link>
                  </li>
                  <li>
                    <HashLink smooth to="/#contact-section" target="_blank">
                      <img src={Contact} alt="" style={{ maxWidth: 32, filter: "invert(1)" }} />
                      <p>Contact</p></HashLink>
                  </li>
                </> : null
              }

            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
