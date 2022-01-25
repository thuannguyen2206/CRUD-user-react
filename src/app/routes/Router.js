import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// layout
import LoginLayout from "../../pages/layouts/LoginLayout";
import MainLayout from "../../pages/layouts/MainLayout";
;

// page

import HomePage from "../../pages/home/Home";
import ContactPage from "../../pages/contact/Contact";
import AboutPage from "../../pages/about/About";
import LoginPage from "../../pages/auth/Login";
import NotFound from "../../pages/utils/NotFound";
import User from "../../pages/user/Users";
import AccessDenied from "../../pages/utils/AccessDenied";
import Logout from "../../pages/auth/Logout";

// private route
const PrivateWrapper = () => {
  let token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default function Router() {
  return (
    <Routes>
      {/* using login layout */}
      <Route path="login" element={<LoginLayout />}>
        <Route index element={<LoginPage />} />
      </Route>

      {/* using main layout */}
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<User />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>
      </Route>

      {/* access denied page */}
      <Route path="/denied" element={<AccessDenied />}></Route>
      {/* not found page */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
