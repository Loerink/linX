import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-2xl">linX</h1>
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
        <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
        <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;