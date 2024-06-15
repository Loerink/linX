import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 p-4 text-white text-center">
    <div className="container mx-auto">
      <div className="flex justify-center space-x-4">
        <a href="/" className="hover:text-gray-400">Home</a>
        <a href="/about" className="hover:text-gray-400">About</a>
        <a href="/contact" className="hover:text-gray-400">Contact</a>
      </div>
      <p className="mt-4">&copy; 2024 linX. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;