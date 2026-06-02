import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, Briefcase, LogOut, History, Search, Bell } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced navbar search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/market/search`,
          { params: { q: searchQuery.trim() } }
        );
        setSearchResults(data.data || []);
        setShowSearch(true);
      } catch {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await storeLogout();
    navigate("/login");
  };

  const handleSearchSelect = (symbol) => {
    setSearchQuery("");
    setShowSearch(false);
    navigate(`/stock/${symbol}`);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const defaultAvatar = "Images/profileImg.jpeg";
  const avatarSrc = isAuthenticated && user?.profilePhoto ? user.profilePhoto : defaultAvatar;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/market", label: "Markets" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span className="text-text-primary font-bold text-xl">
            Ghost<span className="text-primary">Trade</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors relative py-1 ${
                isActive(link.to)
                  ? "text-primary after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Bar (Desktop) */}
          <div className="hidden md:block relative" ref={searchRef}>
            <div className="flex items-center bg-surface-tertiary rounded-full px-3.5 py-2 w-56 lg:w-64 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white transition-all border border-transparent focus-within:border-primary/20">
              <Search size={16} className="text-text-muted mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearch(true)}
                className="w-full bg-transparent outline-none text-sm text-text-primary placeholder-text-muted"
              />
            </div>
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden animate-slide-down z-50 max-h-80 overflow-y-auto">
                {searchResults.slice(0, 6).map((item, index) => (
                  <div
                    key={`${item.symbol}-${index}`}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-secondary transition-colors border-b border-border-light last:border-b-0"
                    onClick={() => handleSearchSelect(item.symbol)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm font-semibold">{item.symbol?.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">{item.symbol}</p>
                      <p className="text-xs text-text-muted truncate">{item.instrument_name}</p>
                    </div>
                    <span className="text-[10px] text-primary bg-primary-50 px-2 py-0.5 rounded-full uppercase font-medium shrink-0">
                      {item.instrument_type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          {isAuthenticated && (
            <button className="relative p-2 text-text-muted hover:text-text-primary hover:bg-surface-tertiary rounded-full transition-colors">
              <Bell size={20} />
            </button>
          )}

          {/* Profile / Login */}
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  <img
                    className="rounded-full h-9 w-9 object-cover border-2 border-surface-tertiary"
                    src={avatarSrc}
                    alt="Profile"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white border border-border rounded-xl shadow-lg py-1.5 z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-border-light">
                      <p className="text-sm font-semibold text-text-primary">{user?.name || "User"}</p>
                      <p className="text-xs text-text-muted truncate">{user?.email || ""}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <User size={16} /> Profile
                    </Link>
                    <Link to="/portfolio" className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <Briefcase size={16} /> Portfolio
                    </Link>
                    <Link to="/history" className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <History size={16} /> History
                    </Link>
                    <hr className="border-border-light my-1" />
                    <button
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-danger hover:bg-danger-light transition-colors text-left text-sm font-medium"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-text-secondary p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg z-50 animate-slide-down">
          {/* Mobile Search */}
          <div className="px-4 pt-4 md:hidden">
            <div className="flex items-center bg-surface-tertiary rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/30">
              <Search size={16} className="text-text-muted mr-2" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-text-primary placeholder-text-muted"
              />
            </div>
          </div>
          <div className="flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  isActive(link.to) ? "text-primary bg-primary-50" : "text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}