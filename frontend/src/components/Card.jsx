function Card({ data, setShowPopup, setSelectedPetId }) {
  const handleAdoptNow = () => {
    setSelectedPetId(data._id); // Pass petId to the state in the parent
    setShowPopup(true); // Show the popup
  };

  return (
    <div className="card card-compact bg-base-100 w-[300px] shadow-xl">
      <figure>
        <img
          src={data.img}
          alt={data.name}
          className="object-cover w-full h-60"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-gray-800">
          {data.name}
        </h2>
        <p className="text-gray-600">{data.Animal}</p>
        <p className="text-gray-600">{data.Age}</p>
        <p className="text-gray-600">{data.Gender}</p>
        <p className="text-gray-600">{data.Location}</p>

        <div className="card-actions justify-end">
          <button
            onClick={handleAdoptNow}
            className="badge badge-outline p-5 hover:bg-yellow-500 hover:text-black transition duration-300"
          >
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
