import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
import list from "../assets/Animals.json";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/pets?category=${category}`);
  };

  return (
    <div className="explore-categories" id="explore-categories">
      <hr />
      <h1>Explore our Pet Categories</h1>
      <p className="explore-categories-text">
        Choose from our diverse variety of all kinds of pets
      </p>
      <div className="explore-categories-list flex flex-row flex-wrap justify-center gap-6">
        {list.map((item, index) => (
          <div
            key={index}
            className="explore-categories-list-item p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => handleCategoryClick(item.name)}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover mx-auto mb-4"
            />
            <h3 className="text-center text-lg font-semibold text-gray-700">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Categories;
