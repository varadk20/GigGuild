import React from 'react';
import './Footer.css';
import { Phone, Email } from '@mui/icons-material'; // Import Material UI icons

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          {/* Add your logo here */}
          <img src="/Logo.jpeg" alt="Logo" style={{ maxWidth: '150px' }} />

        </div>
        <div className="footer-center">
          <p>Reach Out to Us At:</p>
        </div>
        <div className="footer-contact">
          <div className="contact-section">
            <div className="footer-item">
              <Phone className="icon" />
              <span>+91 9372921217</span>
            </div>
            <div className="footer-item">
              <Phone className="icon" />
              <span>+91 9372818166</span>
            </div>
            <div className="footer-item">
              <Phone className="icon" />
              <span>+91 8291613393</span>
            </div>
          </div>
          <div className="contact-section">
            <div className="footer-item">
              <Email className="icon" />
              <span>thegigguild@gmail.com</span>
            </div>
            <div className="footer-item">
              <Email className="icon" />
              <span>varadk20@gmail.com</span>
            </div>
            <div className="footer-item">
              <Email className="icon" />
              <span>ezekiellouis@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 All Copyrights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
