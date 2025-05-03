import { useState } from "react";
import petList from "../assets/petlist.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import AdoptionPopup from "./AdoptionPopup"; // Import the popup

function Popular() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null); // Store the selected petId

  const filterData = petList.filter((data) => data.Gender === "Female");

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <section className="p-8 mt-12 bg-gradient-to-b from-customMus-200 via-customMus-100 to-customMus-50">
      <div className="text-center mt-1 p-4 mb-8">
        <h3 className="text-5xl font-extrabold text-customMus-600 font-bubblegum">
          Our Most Loved Pets
        </h3>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Discover our most adored pets waiting for a loving home!
          <br /> Don’t let them wait too long – they deserve your care.
        </p>
        <hr className="border-customMus-400 mt-4" />
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {filterData.map((data) => (
            <Card
              data={data}
              key={data.id}
              setShowPopup={setShowPopup}
              setSelectedPetId={setSelectedPetId} // Pass the setter for petId
            />
          ))}
        </Slider>
      </div>

      {/* Render the popup if showPopup is true */}
      {showPopup && (
        <AdoptionPopup
          setShowPopup={setShowPopup}
          petId={selectedPetId} // Pass the selected petId to the popup
        />
      )}
    </section>
  );
}

export default Popular;
