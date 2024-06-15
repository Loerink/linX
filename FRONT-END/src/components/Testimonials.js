import React from 'react';

const Testimonials = () => (
  <div className="py-12 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold">Testimonials</h2>
      <div className="flex flex-wrap mt-8">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">"This service is fantastic! It has helped us tremendously."</p>
            <p className="mt-4 text-gray-600">- Happy Customer</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">"Amazing experience. Highly recommended!"</p>
            <p className="mt-4 text-gray-600">- Satisfied User</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">"A game changer for our projects."</p>
            <p className="mt-4 text-gray-600">- Project Lead</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;