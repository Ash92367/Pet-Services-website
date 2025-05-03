import React, { useEffect, useState } from "react";
import "./List.css";

const List = ({ removedPetId }) => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  // Fetch pets from the backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pet/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setPets(result.data); // Access the data field in the API response
        } else {
          setError("Failed to fetch pets.");
        }
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to fetch pets.");
      }
    };

    fetchPets();
  }, []);

  // Remove the pet from the list if it was approved in adoption
  useEffect(() => {
    if (removedPetId) {
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== removedPetId));
    }
  }, [removedPetId]);

  // Delete pet from the database and update state
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/pet/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update state to remove the deleted pet
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
      alert("Pet deleted successfully!");
    } catch (err) {
      console.error("Error deleting pet:", err);
      setError("Failed to delete pet.");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="list-pets-container admin-list-page">
      <h1 className="list-pets-title">List of Pets</h1>
      <table className="list-pets-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Animal</th>
            <th>Location</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <tr key={pet._id}>
                <td>
                  <img
                    src={`http://localhost:4000/${pet.image}`}
                    alt={pet.name}
                    className="pet-image"
                  />
                </td>
                <td>{pet.name}</td>
                <td>{pet.age}</td>
                <td>{pet.animal}</td>
                <td>{pet.location}</td>
                <td>{pet.gender}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(pet._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-pets-message">
                No pets available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
