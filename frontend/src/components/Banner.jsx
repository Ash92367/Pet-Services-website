import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full h-[80vh] mt-32">
      {/* Banner Image */}
      <img
        src="ban.svg" 
        alt="Pet Care Banner"
        className="w-90 h-full object-cover"
      />

      {/* Adopt Now Button */}
      <div className="absolute bottom-10 left-10">
        <Link to="/adopt-pets">
        <button className="border-2 border-customMus text-white bg-transparent font-semibold py-3 px-8
         rounded-full transition duration-300 ease-in-out hover:bg-customMus-400 hover:text-black ml-0">
        ADOPT NOW
      </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
