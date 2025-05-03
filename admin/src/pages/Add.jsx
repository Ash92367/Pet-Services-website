import React, { useState } from "react";

const Add = () => {
  const [petData, setPetData] = useState({
    name: "",
    animal: "",
    age: "",
    location: "",
    gender: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPetData({ ...petData, image: e.target.files[0] });
    setMessage("Image uploaded successfully!");
  };

  const handleAddPet = async () => {
    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      formData.append(key, petData[key]);
    });

    try {
      const response = await fetch("http://localhost:4000/api/pet/add", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Pet added successfully!");
        setPetData({
          name: "",
          animal: "",
          age: "",
          location: "",
          gender: "",
          image: null,
        });
        setMessage("");
      } else {
        alert(result.message || "Failed to add pet.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Server error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-2xl flex items-center   sm:h-[800px] md:h-[600px] lg:h-[1000]">
    <div className="w-full space-y-6">
  <h2 className="text-4xl font-semibold text-gray-800 text-center">Add a New Pet</h2>
      <p className="text-gray-600 mb-6 text-center">
        Complete the fields below to add a new pet to the system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Pet Name</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Animal Type</label>
          <input
            type="text"
            name="animal"
            value={petData.animal}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Age</label>
          <input
            type="text"
            name="age"
            placeholder="E.g., 2 years, 6 months"
            value={petData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="location"
            value={petData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={petData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <label
            htmlFor="image"
            className="w-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg py-4 cursor-pointer"
          >
            <img src="./upload.png" alt="Upload" className="h-8 w-8 mr-2" />
            <span className="text-gray-600">Click to upload</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            hidden
            onChange={handleFileChange}
          />
          {message && <p className="text-green-600 mt-2">{message}</p>}
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleAddPet}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Pet
        </button>
      </div>
    </div> </div>
  );
};

export default Add;
