import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [shadow, setShadow] = useState(false);
  const { cartItems } = useContext(StoreContext);

  // Calculate total cart items count
  const totalCartCount = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar bg-white px-8 py-2 fixed top-0 w-full z-10 ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 ml-20"> 
        <div className="flex items-center">
        <img src="logo6.png" alt="Home" className="w-24 h-24" />
        <span className="text-lg font-bold ml-4">PAWS & CLAWS</span>
      </div>
        </Link>
        
        <ul className="menu menu-horizontal px-1 flex justify-center gap-8">
          <li>
            <Link
              to="/"
              className="text-lg hover:underline hover:text-yellow-500 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/adopt-pets"
              className="text-lg hover:underline hover:text-yellow-500 transition duration-300">
              Adopt Pets
            </Link>
          </li>
          <li tabIndex={0} className="dropdown dropdown-hover">
            <span className="text-lg cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">
              <Link to="./pet-supplies">Pet Supplies</Link>
            </span>
            <ul className="dropdown-content bg-base-100 shadow rounded-box p-2 w-40">
              <li>
                <Link to="/pet-supplies/food">Pet Food</Link>
              </li>
              <li>
                <Link to="/pet-supplies/accessories">Accessories</Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4 mr-20"> {/* Added margin-right */}
          <Link to="/cart" className="relative">
            <div className="indicator">
              <img src="shopping-cart.png" alt="Cart" className="w-8 h-8 mt-4" />
              {totalCartCount > 0 && (
                <span className="badge badge-sm badge-error indicator-item">
                  {totalCartCount}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={() => setShowLogin(true)}
            className="btn btn-md btn-outline hover:bg-yellow-500 hover:text-white hover:scale-105 transition duration-300"
          >
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
