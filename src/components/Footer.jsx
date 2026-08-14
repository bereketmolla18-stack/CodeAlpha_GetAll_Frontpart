import React from 'react'
import logo from '../assets/brand/getall-logo.svg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="GetAll logo" className="footer-logo" />
          <div>
            <p className="footer-brand-name">GetAll</p>
            <p className="footer-slogan">everything is here</p>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <ul>
              <li>Phones</li>
              <li>Computers</li>
              <li>Home</li>
              <li>Fashion</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Track Order</li>
              <li>Returns</li>
              <li>Shipping Info</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About GetAll</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="footer-bottom">© {new Date().getFullYear()} GetAll. All rights reserved.</p>
    </footer>
  )
}
