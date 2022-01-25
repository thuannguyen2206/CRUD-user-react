import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import AuthApi from "../../app/apis/auth/AuthApi";

export default function Logout() {
    
  useEffect(() => {
    AuthApi.Logout();
  });

  return <Navigate to="/login" />;
}
