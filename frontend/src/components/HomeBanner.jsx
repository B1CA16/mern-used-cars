import React from 'react';

const HomeBanner = () => {
  return (
    <div className="relative rounded-md bg-cover bg-center mx-16 text-white py-0 lg:py-20" style={{ backgroundImage: "url('/road.jpg')" }}>
      <div className="bg-blue-700/70 p-10 backdrop-blur-sm rounded-md mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Drive Your Dream Car?</h2>
        <p className="text-lg mb-6">
          Explore the best deals on top-quality pre-owned cars. Drive away with confidence today.
        </p>
        <button className="bg-yellow-400 text-blue-900 py-3 px-6 rounded-md font-semibold hover:scale-105 hover:bg-yellow-500 transition duration-300">
          Browse Inventory
        </button>
      </div>
    </div>
  );
}

export default HomeBanner;
