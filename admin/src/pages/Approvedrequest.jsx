import React, { useEffect, useState } from "react";
import "./ApprovedRequests.css"; 
const ApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/form/approved-requests"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setApprovedRequests(result.data);
        } else {
          setError("Failed to fetch approved requests.");
        }
      } catch (err) {
        console.error("Error fetching approved requests:", err);
        setError("Failed to fetch approved requests.");
      }
    };

    fetchApprovedRequests();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (approvedRequests.length === 0) {
    return <p className="no-requests">No approved requests yet.</p>;
  }

  return (
    <div className="approved-requests-container">
      <h1 className="title">Approved Adoption Requests</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Living Situation</th>
            <th>Previous Pets</th>
            <th>Other Pets</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.phoneNo}</td>
              <td>{req.livingSituation}</td>
              <td>{req.previousPets}</td>
              <td>{req.otherPets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedRequests;
