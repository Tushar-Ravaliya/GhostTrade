import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Briefcase, LogOut, History } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile dropdown
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    setIsProfileOpen(false);
    navigate("/login");
  }
  return (
    <nav className="relative bg-black border-b border-gray-900">
      <div className="flex justify-between items-center px-6 md:px-8 py-4">


        <div className="flex items-center gap-3">
          <img className="rounded-full h-10 w-10 md:h-12 md:w-12 object-cover" src="Images/Logo1.jpeg" alt="Logo" />
          <p className="text-white font-bold text-xl md:text-2xl">
            Ghost <span className="text-green-700">Trade</span>
          </p>
        </div>


        <div className="hidden lg:flex text-white gap-10 font-semibold">
          <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
          <Link to="/market" className="hover:text-green-500 transition-colors">Markets</Link>
          <Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link>
        </div>


        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="focus:outline-none hover:ring-2 hover:ring-green-700 rounded-full transition-all"
          >
            <img
              className="rounded-full h-10 w-10 md:h-12 md:w-12 object-cover"
              src="Images/profileImg.jpeg"
              alt="Profile"
            />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-48 bg-black border border-gray-800 rounded-lg shadow-xl py-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-green transition-colors" onClick={() => setIsProfileOpen(false)}>
                <User size={18} /> Profile
              </Link>
              <Link to="/portfolio" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-green transition-colors" onClick={() => setIsProfileOpen(false)}>
                <Briefcase size={18} /> Portfolio
              </Link>
              <Link to="/history" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-green transition-colors" onClick={() => setIsProfileOpen(false)}>
                <History size={18} /> History
              </Link>
              <hr className="border-gray-800 my-1" />
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-white/10 transition-colors text-left font-semibold"
                onClick={logout}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}


          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 z-50 py-6">
          <div className="flex flex-col items-center gap-6 text-white font-semibold">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/market" onClick={() => setIsMenuOpen(false)}>Markets</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}