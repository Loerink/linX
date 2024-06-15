import React from 'react';

const Features = () => (
  <div className="py-12 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Features</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <h3 className="text-2xl font-bold mb-4">Feature 1</h3>
            <p className="text-gray-700">Description of Feature 1.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <h3 className="text-2xl font-bold mb-4">Feature 2</h3>
            <p className="text-gray-700">Description of Feature 2.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <h3 className="text-2xl font-bold mb-4">Feature 3</h3>
            <p className="text-gray-700">Description of Feature 3.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Features;