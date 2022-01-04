import React from "react";
import { Container, Button } from "@material-ui/core";
import Logo from "../../resources/frame.png";
import LogoText from "../../resources/CosmoNote.svg";
import feedback from "../../resources/feedback.svg";
import info from "../../resources/info.svg";
import AuthIcon from "../auth/AuthIcon";
import { Link, useLocation, has } from "react-router-dom";
import background from "../../resources/background.jpeg";
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
                width="60px"
                height="60px"
              />
              <img src={LogoText} alt="cosmonote" width="158px" height="17px" />
            </Link>
          </div>
          <div className="nav__bar">
            <ul className="list-unstyled">
              <li>
                <Button
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScBYJsVfzZAcBAGlYNIvgiOnQE4yI-vaJEo66T7oMW9-lXD5w/viewform"
                >
                  <img src={feedback} width="32px" height="32px" />
                  <p>Feedback</p>
                </Button>
              </li>
              <li>
                <Link to="/about" target="_blank">
                  <img src={info} width="32px" height="32px" />
                  <p>Information</p>
                </Link>
              </li>
              <li>
                <AuthIcon />
              </li>

              {location.pathname.includes("/project/") ?
                <>
                  <li>
                    <Link to="/terms" target="_blank">
                      <img src={Terms} style={{ maxWidth: 32, filter: "invert(1)" }} width="32px" height="32px" />
                      <p>Terms and Conditions</p></Link>
                  </li>
                  <li>
                    <HashLink smooth to="/#contact-section" target="_blank">
                      <img src={Contact} alt="" style={{ maxWidth: 32, filter: "invert(1)" }} width="32px" height="32px" />
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
