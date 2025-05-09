import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src="./images/Group.png" alt="STEB Logo" />
          <p>Science Technology Engineering Business</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Profile</a>
          <a href="#">Teams</a>
          <a href="#">Store</a>
          <a href="#">Competitions</a>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <div className="icons">
            <img src="./images/X.png" alt="X" />
            <img src="./images/_x30_1._Facebook.png" alt="Facebook" />
            <img src="./images/iNSTA.png" alt="Instagram" />
            <img src="./images/iN.png" alt="LinkedIn" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-wrapper">
        <div className="footer-bottom">
          <p>Copyrights 2024, All Rights Reserved</p>
        </div>
        <div className="footer-policy">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
