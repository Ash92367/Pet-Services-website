import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import { Routes, Route, Navigate } from "react-router-dom";
import AdoptionRequests from "./pages/Adoptionrequest";
import ApprovedRequests from "./pages/Approvedrequest";

function App() {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      <div className="app-content" style={{ display: "flex",padding:"40px", marginTop: "20px" }}>
        <Sidebar />

        <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/add-pets" element={<Add />} />
            <Route path="/list-pets" element={<List />} />
            <Route path="/pending-requests" element={<AdoptionRequests />} />
            <Route path="/approved-requests" element={<ApprovedRequests />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const DefaultPage = () => {
  return (
    <div style={{ textAlign: "center", color: "#333" , marginTop: "70px "}}>
      <h1 style={{ fontSize: "2.5rem", margin: "20px 0", color: "#FFBE4D" }}>
      Welcome to the Admin Portal!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#666" }}>
      Use the sidebar to navigate through the admin features.
      </p>
    </div>
  );
};

export default App;
