import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="wrapper">
        <h3 style={{textAlign: "center", marginBottom:"50px"}}>Login layout</h3>
        <Outlet />
      </div>
    </>
  );
}
