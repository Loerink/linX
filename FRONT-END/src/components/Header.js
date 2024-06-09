import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <img src="assets/images/logo.png" alt="linX Logo" />
        <ul>
          <li><a href="#product">Product</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#open-source">Open Source</a></li>
          <li><a href="#enterprise">Enterprise</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;