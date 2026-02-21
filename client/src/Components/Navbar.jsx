import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div className="flex justify-between items-center gap-3">
        <img
          className="rounded-full h-15 w-15 text-white"
          src="Images/Logo1.jpeg"
        />
        <p className="text-white font-bold text-3xl">
          Ghost <span className="text-green-700">Trade</span>
        </p>
      </div>
      <div className="text-white flex gap-30 font-semibold">
        <Link to="/">Home</Link>
        <Link to="/market">Markets</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div>
        <img className="rounded-full h-14 w-14" src="Images/profileImg.jpeg" />
      </div>
    </div>
  );
}
