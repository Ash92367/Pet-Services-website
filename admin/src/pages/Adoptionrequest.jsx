import React, { useEffect, useState } from "react";
import "./Adoptionrequest.css"; // CSS for styling

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  // Fetch adoption requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/form/listforms");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setRequests(result.data);
        } else {
          setError("Failed to fetch adoption requests.");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch adoption requests.");
      }
    };

    fetchRequests();
  }, []);

  // Handle approve
  const handleApprove = async (id, petId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/form/approve/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert(`Request approved!`);
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error approving request:", err);
      setError("Failed to approve request.");
    }
  
      setRemovedPetId(petId); // Update the pet ID to remove
    
    
  };

  // Handle reject
  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/form/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reject request.");
      }
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );
      alert(`Request rejected!`);
    } catch (err) {
      console.error("Error rejecting request:", err);
      setError("Failed to reject request.");
    }
  };

  return (
    <div className="adoption-requests-container">
      <h1 className="title">Pending Adoption Requests</h1>
      {error && <p className="error">{error}</p>}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Living Situation</th>
            <th>Pet Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.phoneNo}</td>
              <td>{req.livingSituation}</td>
              <td>{req.pettoadopt?.name || "No Pet Found"}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => handleApprove(req._id, req.pettoadopt?._id)}
                    className="btn-approve"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="btn-reject"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;
