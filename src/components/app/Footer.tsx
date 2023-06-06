import React from "react";
import { Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import background from "../../resources/alternativeBackground.jpg";

const Footer = () => {
  const location = useLocation();
  return (
    <footer
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }
      }
    >
      <div
        style={{backgroundImage: `url(${background})`}}
      >
        <Container>
          <div className="footer-container">
            {/*<div>
              <Link to="/terms" target="_blank">
                AGBs
              </Link>
              <Link to="/#contact-section" target="_blank">Kontakt</Link>
            </div>*/}
            <p>Made with <span id="heart">&#9829;</span> von Studenten der Westfälischen Hochschule</p>
            Copyright © 2023 CosmoNote
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
