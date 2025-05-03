import React, { useContext } from "react";
import list from "../assets/acs.json";
import { StoreContext } from "../context/StoreContext";

const Acs = () => {
  const { addToCart } = useContext(StoreContext);

  return (
    <section className="p-8 bg-gradient-to-b from-customMus-200 via-customMus-100 to-customMus-50">
      <div className="text-center mt-16 p-4 mb-8">
        <h3 className="text-4xl font-extrabold text-customMus-600 font-bubblegum">
          Pet Accessories Collection
        </h3>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Explore our range of high-quality pet accessories for your furry friends.
        </p>
        <hr className="border-customMus-400 mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h4 className="text-lg font-bold text-customMus-500">{item.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
            <p className="text-sm text-gray-500 mt-1">Material: {item.material}</p>
            <p className="text-sm text-gray-500 mt-1">Price: {item.price}</p>
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

export default Acs;
