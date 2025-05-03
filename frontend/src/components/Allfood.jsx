import React, { useState , useContext} from 'react';
import list from '../assets/pf.json'; 
import { StoreContext } from "../context/StoreContext";

const Allfood = () => {
  const { addToCart } = useContext(StoreContext); 
  const [selectedType, setSelectedType] = useState('All');

  // Filter logic
  const filteredFood = selectedType === 'All' ? list : list.filter(item => item.type === selectedType);

  return (
    <section className="p-8 bg-gradient-to-b from-customMus-200 via-customMus-100 to-customMus-50">
      {/* Header Section */}
      <div className="text-center mt-16 p-4 mb-8">
        <h3 className="text-4xl font-extrabold text-customMus-600 font-bubblegum">
          Pet Food Specials 
        </h3>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Delicious and nutritious food options for all your beloved pets.
        </p>
        <hr className="border-customMus-400 mt-4" />
      </div>

      {/* Filter Dropdown */}
      <div className="my-6 flex justify-end">
        <label htmlFor="filter" className="text-xl font-medium mr-1 mt-2">
          Filter by :  
        </label>
        <select
        id="filter"
        className="px-4 py-2 border rounded-md bg-transparent text-black focus:outline-none"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        >
        <option value="All">All</option>
        <option value="Dog Food">Dog Food</option>
        <option value="Cat Food">Cat Food</option>
        <option value="Bird Food">Bird Food</option>
        </select>

      </div>

      {/* Filtered Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFood.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={item.img}
              alt={`${item.brand} ${item.flavor}`}
              className="w-24 h-24 object-contain mb-2"
            />
            <h4 className="text-lg font-bold text-customMus-500">{item.brand}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.type}</p>
            {item.flavor && <p className="text-sm text-gray-600 mt-1">Flavor: {item.flavor}</p>}
            <p className="text-sm text-gray-500 mt-1">{item.weight}</p>
            <p className="text-green-600 font-bold mt-2">{item.price}</p>
            <button
            className="mt-3 px-4 py-1 text-sm font-medium text-black bg-customMus-500 border-2 border-customMus-400 
            rounded hover:bg-customMus-600 hover:border-customMus-600 transition-colors duration-200"
            onClick={() => addToCart(item.id)}
            >
            Add to Cart
          </button>


          </div>
        ))}
      </div>
    </section>
  );
};

export default Allfood;
