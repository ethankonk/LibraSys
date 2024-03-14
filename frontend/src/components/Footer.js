import React from 'react'
import { Link } from 'react-router-dom'
import '../css/footer.css'

export default function Footer () {
    return (
        <div className="footer-container">
          <div className="footer-links">
            <Link to='/'>Home</Link>
            <a href="#">FAQs</a>
            <a href="#">Hours</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-text">© 2024 Library System. All Rights Reserved.</p>
        </div>
      );
}