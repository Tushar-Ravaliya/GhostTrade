import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
