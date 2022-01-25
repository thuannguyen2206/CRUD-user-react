import React from "react";
import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <>
      <div className="dropdown">
        <div className="dropdown_detail">
          <a href="#" className="dropdown_title">
            Welcome, Admin
          </a>
          <div className="dropdown_list">
            <a href="#">Settings</a>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </>
  );
}
