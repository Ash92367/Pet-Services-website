import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Cartt = () => {
  const { cartItems, allItems, removeFromCart, addToCart, deleteFromCart } = useContext(StoreContext);

  const cartDetails = allItems.filter((item) => cartItems[item.id]);

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-customMus-600 mt-24">
        Shopping Cart
      </h1>

      {cartDetails.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Cart Items */}
          <ul className="space-y-4">
            {cartDetails.map((item) => (
              <li
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: {item.price} PKR</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-700">
                      {cartItems[item.id]}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => deleteFromCart(item.id)}>
                  <img
                    src="delete.png" 
                    alt="Remove"
                    className="w-8 h-8"  
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">
              Total:{" "}
              <span className="text-green-500">
                {cartDetails
                  .reduce(
                    (total, item) => {
                      const price = Number(item.price); 
                      const quantity = cartItems[item.id] || 0; // Ensure quantity defaults to 0 if undefined
                      return total + price * quantity;
                    },
                    0
                  )
                  .toFixed(2)}{" "}
                PKR
              </span>
            </h3>
            <button className="bg-customMus-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-customMus-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartt;
