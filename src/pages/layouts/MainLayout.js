import React from "react";
import { Outlet, Link } from "react-router-dom";

import AuthHeader from './AuthHeader'

export default function Main() {
  return (
    <>
      <div className="header">
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <AuthHeader></AuthHeader>
      </div>
      <Outlet />
    </>
  );
}
