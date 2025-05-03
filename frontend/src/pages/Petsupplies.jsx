import React from 'react';
import { Link } from "react-router-dom";

const PetSupplies = () => {
  return (
      <div className="p-8 bg-gradient-to-b from-customMus-200 via-customMus-100 to-customMus-50">
      <div className="text-center mt-20 p-4 mb-8">
      <h3 className="text-6xl font-extrabold text-customMus-600 font-bubblegum">
          Pet Supplies 
        </h3>
        <p className="mt-4 text-lg font-semibold text-gray-700">
        Explore our range of high-quality supplies for your pets.
        </p>
        <hr className="border-customMus-400 mt-4" />
        </div>
      


      <div className="mt-12 flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Pet Food Link */}
        <Link
          to="/pet-supplies/food"
          className="block bg-gradient-to-r text-black font-bold py-4 px-8 rounded shadow-lg hover:shadow-[0_6px_8px_rgba(255,190,77,0.5)] hover:scale-105 transition-transform">
         
          <img src="/foodhead.jpg" alt="Pet Food" className="w-120 h-80 object-contain mx-auto mb-2" />
           Pet Food
        </Link>

        {/* Pet Accessories Link */}
        <Link
          to="/pet-supplies/accessories"
          className="block bg-gradient-to-r text-black font-bold py-4 px-8 rounded shadow-lg hover:shadow-[0_6px_8px_rgba(255,190,77,0.5)] hover:scale-105 transition-transform">
          <img src="/acchead.jpg" alt="Pet Accessories" className="w-120 h-80 object-contain mx-auto mb-2" />
           Pet Accessories
        </Link>
      </div>
    </div>
  );
};

export default PetSupplies;