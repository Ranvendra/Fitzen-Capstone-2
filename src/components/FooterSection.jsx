import './FooterSection.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <>
    <footer className="fitzen-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Fitzen</h2>
          <p>Elevate your fitness journey with personalized tutorials and expert guidance, all in one app.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/exercise">Tutorials</a></li>
            <li><a href="/mentors">Mentors</a></li>
            <li><a href="/contact">Support</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@fitzen.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

    </footer>

<div className="footer-bottom">
Copyright © 2025 Fitzen. All rights reserved.
</div>
</>
  );
};

export default FooterSection;