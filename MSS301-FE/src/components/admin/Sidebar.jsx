import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = "block p-2 text-gray-700 hover:bg-gray-200";

const AdminSidebar = () => {
  return (
    <aside className="w-48 bg-gray-100 h-screen shadow-md">
      <nav className="p-2">
        <NavLink to="." end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="films" className={linkClass}>
          Films
        </NavLink>
        <NavLink to="users" className={linkClass}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
