import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

export default function Layout() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
