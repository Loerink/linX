import React from 'react';

const HeroSection = () => (
  <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('/path/to/your/image.jpg')` }}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold">Welcome to linX</h1>
        <p className="mt-4 text-2xl">A modern solution for your projects</p>
        <button className="mt-8 px-8 py-4 bg-blue-500 text-white text-xl rounded-full">Get Started</button>
      </div>
    </div>
  </div>
);

export default HeroSection;