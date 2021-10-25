import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <footer>
      <Container>
        <div className="footer-container">
          <div>
            <Link to="/terms" target="_blank">
              Terms and Conditions
            </Link>
            <Link to="">Contact Us</Link>
          </div>
          <p>Copyright © 2021 CosmoNote U.G. All rights reserved. Germany</p>
        </div>
      </Container>
    </footer>
  );
};

export default Header;
