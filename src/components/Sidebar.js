import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>BlueMedix</h2>
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/reports">📊 Reports</Link></li>
        <li><Link to="/users">👤 Users</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
