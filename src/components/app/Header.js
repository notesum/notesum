import React from "react";
import { Container, Button } from "@material-ui/core";
import Logo from "../../resources/frame.png";
import LogoText from "../../resources/CosmoNote.svg";
import feedback from "../../resources/feedback.svg";
import info from "../../resources/info.svg";
import user from "../../resources/user.svg";

import AuthIcon from "../auth/AuthIcon";
import { Link, useLocation } from "react-router-dom";
import background from "../../resources/background.jpg";

const Header = () => {
  const location = useLocation();
  return (
    <header
      className="header"
      style={
        location.pathname.includes("/project/")
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
                  href="https://docs.google.com/forms/d/e/1FAIpQLScK9dZrpjcqcL4SGUc_bcwpAxWYSAH62hYPfdcK_v-2z0PRow/viewform"
                >
                  <img src={feedback} alt="" />
                </Button>
              </li>
              <li>
                <Link to="/about">
                  <img src={info} alt="" />
                </Link>
              </li>
              <li>
                {/* <a href="#">
                  <img src={user} alt="" />
                </a> */}
                <AuthIcon />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
