import { createContext, useState } from "react";
import flist from "../assets/pf.json"; // Replace with actual path
import alist from "../assets/acs.json"; // Replace with actual path

export const StoreContext = createContext(null); // Named export

const StoreContextProvider = (props) => {
  // Combine item lists into allItems
  const allItems = [...flist, ...alist]; // Ensure unique IDs and valid data

  const [cartItems, setCartItems] = useState({});

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  // Delete item from cart
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const contextValue = {
    allItems,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
  };

  console.log("All Items:", allItems); // Debugging
  console.log("Cart Items:", cartItems); // Debugging

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider; // Default export
