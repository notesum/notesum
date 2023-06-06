import React from "react";
import { Container, Button } from "@mui/material";
import Logo from "../../resources/frame.png";
import LogoText from "../../resources/CosmoNote.svg";

import { Link, useLocation, has } from "react-router-dom";
import background from "../../resources/alternativeBackground.jpg";
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
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScBYJsVfzZAcBAGlYNIvgiOnQE4yI-vaJEo66T7oMW9-lXD5w/viewform">
                  Feedback
                </a>
              </li>
              {/*<li>{<AuthIcon /></li>*/}
                <li>
                    <a
                      target="_blank"
                      href="https://www.paypal.com/donate/?hosted_button_id=BTJE5YVKQXVLC">
                      Spenden
                    </a>
                  </li>
                  <li>
                    <Link to="/terms" target="_blank">AGBs</Link>
                  </li>
                  <li>
                    <HashLink smooth to="/#contact-section" target="_blank">Kontakt</HashLink>
                  </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
