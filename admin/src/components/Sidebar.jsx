import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title"></h2>
      <p className="sidebar-subtitle">Admin Control Panel:</p>
      <hr className="sidebar-divider" />

      {/* Add a New Pet */}
      <NavLink
        to="/add-pets"
        className={({ isActive }) =>
          `sidebar-option ${isActive ? "active-option" : ""}`
        }
      >
        <span className="sidebar-icon">✔</span> Add a New Pet
      </NavLink>

      {/* View All Pets */}
      <NavLink
        to="/list-pets"
        className={({ isActive }) =>
          `sidebar-option ${isActive ? "active-option" : ""}`
        }
      >
        <span className="sidebar-icon">✔</span> View All Pets
      </NavLink>

      <NavLink
        to="/pending-requests"
        className={({ isActive }) =>
          `sidebar-option ${isActive ? "active-option" : ""}`
        }
      >
        <span className="sidebar-icon">✔</span> Pending Adoption Requests
      </NavLink>

      {/* Approved Requests */}
      <NavLink
        to="/approved-requests"
        className={({ isActive }) =>
          `sidebar-option ${isActive ? "active-option" : ""}`
        }
      >
        <span className="sidebar-icon">✔</span> Approved Requests
      </NavLink>
    </div>
  );
};

export default Sidebar;
