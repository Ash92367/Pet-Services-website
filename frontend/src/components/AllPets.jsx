import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AllPets = ({ setShowPopup, setSelectedPetId }) => {
  const [selectedAnimal, setSelectedAnimal] = useState("All");
  const [petList, setPetList] = useState([]);
  const location = useLocation();

  // Update selectedAnimal based on query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedAnimal(category);
    }
  }, [location]);

  // Fetch pet list from API
  const fetchPetList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/pet/list"); // Replace with actual API URL
      console.log("API Response:", response.data);
      setPetList(response.data.data || []); // Ensure `data` is handled properly
    } catch (error) {
      console.error("Error fetching pet list:", error.message);
    }
  };

  // Fetch pet list on component mount
  useEffect(() => {
    fetchPetList();
  }, []);

  // Filter pets based on selected category
  const filteredPets =
    selectedAnimal === "All"
      ? petList
      : petList.filter(
          (item) => item.animal?.toLowerCase() === selectedAnimal.toLowerCase()
        );

  return (
    <section className="p-8 bg-gradient-to-b from-customMus-200 via-customMus-100 to-customMus-50 mt-20">
      {/* Header Section */}
      <div className="text-center mt-16 p-4 mb-8">
        <h3 className="text-4xl font-extrabold text-customMus-600 font-bubblegum">
          Adopt a Pet
        </h3>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Find your perfect companion, whether it's a dog, cat, rabbit, or more.
        </p>
        <hr className="border-customMus-400 mt-4" />
      </div>

      {/* Filter Dropdown */}
      <div className="my-6 flex justify-end">
        <label htmlFor="filter" className="text-xl font-medium mr-2">
          Filter by:
        </label>
        <select
          id="filter"
          className="px-4 py-2 border rounded-md bg-transparent text-black focus:outline-none"
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Fish">Fish</option>
          <option value="Bird">Bird</option>
        </select>
      </div>

      {/* Filtered Pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <div
            key={pet._id} // Use `_id` as the unique key
            className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={`http://localhost:4000/${pet.image}`}
              alt={pet.name}
              className="w-30 h-30 object-contain mb-2"
            />
            <h4 className="text-lg font-bold text-customMus-500">{pet.name || "Unknown"}</h4>
            <p className="text-sm text-gray-600 mt-1">{pet.animal || "Unknown"}</p>
            <p className="text-sm text-gray-600 mt-1">
              {pet.gender || "Unknown"}, Age: {pet.age || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Location: {pet.location || "N/A"}
            </p>
            <button
              onClick={() => {
                setSelectedPetId(pet._id); // Set selected pet ID
                setShowPopup(true); // Show the adoption popup
              }}
              className="badge badge-outline px-4 py-2 mt-4 hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              Adopt Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPets;
