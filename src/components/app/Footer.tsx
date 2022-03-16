import React from "react";
import { Container } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import background from "../../resources/background.jpg";

const Footer = () => {
  const location = useLocation();
  return (
    <footer
      style={
        location.pathname == "/" || location.pathname == "/about"
          ? { marginTop: -77 }
          : location.pathname == "/new-project" ? { position: "absolute", bottom: 0, left: 0, width: "100%" } : {}
      }
    >
      <div
        style={
          location.pathname.includes("/project/") || location.pathname.includes("/new-project")
            ? { backgroundImage: `url(${background})` }
            : {}
        }
      >
        <Container>
          <div className="footer-container">
            <div>
              <Link to="/terms" target="_blank">
                Terms and Conditions
              </Link>
              <Link to="/#contact-section" target="_blank">Contact Us</Link>
            </div>
            <p>Copyright © 2021 CosmoNote </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
