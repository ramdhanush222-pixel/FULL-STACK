import React from "react";
import logo from "../logo.jpeg";
import {
  Phone,
  Mail,
  MapPin,
  GitBranchIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <h2>
              <img className="footer-logo-image" src={logo} alt="logo" /> MediCare Hospital
            </h2>
          </div>
          <p>
            Providing quality healthcare to the people of Hyderabad since 2010.<br />
            Your health is our highest priority.
          </p>

          <div className="footer-social-icons">
            <a href="https://www.facebook.com/" className="social-icon facebook" title="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/?hl=en" className="social-icon instagram" title="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.youtube.com/" className="social-icon youtube" title="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">Book Appointment</a>
          <a href="#">Doctor Details</a>
          <a href="#">Specialists</a>
          <a href="#">Services</a>
          
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact Us</h4>

          <div className="contact-item">
            <Phone size={16} />
            <div>
              <p>+91 98765 43210</p>
              <p>+91 87654 32109</p>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={16} />
            <p>care@medicare.com</p>
          </div>

          <div className="contact-item">
            <MapPin size={16} />
            <p>Banjara Hills ,Hyderabad</p>
          </div>

          <div className="contact-item">
            <GitBranchIcon size={16} />
            <p>LB Nagar | Miyapur | Koti | Gachibowli | Hyderabad</p>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2010 MediCare Hospital. <br />
          All rights reserved.</p>

          <div className="footer-policies">
            <a href="#">Privacy Policy</a>
            <span> | </span>
            <a href="#">Terms of Service</a>
            <span> | </span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;