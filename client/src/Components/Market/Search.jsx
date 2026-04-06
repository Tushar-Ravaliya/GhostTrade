import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [logos, setLogos] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search - waits 400ms after user stops typing
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/market/search`,
          { params: { q: query.trim() } }
        );
        const items = data.data || [];
        setResults(items);
        setShowDropdown(true);

        // Fetch logos for search results
        items.forEach(async (item) => {
          if (logos[item.symbol]) return; // Already have it
          try {
            const { data: logoData } = await axios.get(
              `http://localhost:8000/api/v1/market/logo/${item.symbol}`
            );
            if (logoData.url) {
              setLogos((prev) => ({ ...prev, [item.symbol]: logoData.url }));
            }
          } catch {
            // Logo not available
          }
        });
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="w-full min-h-100 bg-black flex flex-col items-center justify-center p-6 space-y-6 font-sans">
      {/* Logo Section */}
      <div className="flex items-center gap-3 md:gap-5 text-5xl md:text-7xl tracking-widest uppercase font-frijole">
        <span className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]">
          GHOST
        </span>
        <span className="text-[#009900] drop-shadow-[0_2px_2px_rgba(0,153,0,0.3)]">
          TRADE
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-[#999999] text-sm md:text-lg font-medium tracking-wide pb-4">
        Search the stock that you're seeking ..
      </p>

      {/* Search Input Container */}
      <div className="relative w-full max-w-150" ref={dropdownRef}>
        <div className="flex items-center w-full bg-white rounded-xl px-4 py-3 md:py-4 transition-shadow focus-within:ring-3 focus-within:ring-green/80">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-7 md:h-7 text-black mr-3 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search stocks, ETFs, crypto..."
            className="w-full bg-transparent outline-none text-black text-lg md:text-xl placeholder-[#a3a3a3] font-medium"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-green rounded-full animate-spin shrink-0 ml-2"></div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#111111] border border-[#333333] rounded-xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto">
            {results.map((item, index) => {
              const logoUrl = logos[item.symbol];
              return (
                <div
                  key={`${item.symbol}-${item.exchange}-${index}`}
                  className="flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-[#1a1a1a] transition-colors border-b border-[#222222] last:border-b-0"
                  onClick={() => handleSelect(item.symbol)}
                >
                  {/* Symbol Logo or Initial */}
                  <div className={`w-10 h-10 rounded-full ${logoUrl ? 'bg-white p-1' : 'bg-[#009900]/20'} flex items-center justify-center shrink-0 overflow-hidden`}>
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={item.symbol}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.textContent = item.symbol?.charAt(0);
                        }}
                      />
                    ) : (
                      <span className="text-[#009900] text-lg font-bold">
                        {item.symbol?.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-white font-medium text-base truncate">
                      {item.symbol}
                    </span>
                    <span className="text-[#777777] text-xs truncate">
                      {item.instrument_name}
                    </span>
                  </div>

                  {/* Exchange & Type Badge */}
                  <div className="flex flex-col items-end shrink-0 gap-1">
                    <span className="text-[#555555] text-xs font-medium">
                      {item.exchange}
                    </span>
                    <span className="text-[10px] text-[#009900] bg-[#009900]/10 px-2 py-0.5 rounded-full uppercase font-medium">
                      {item.instrument_type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {showDropdown && !loading && query.trim().length > 0 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#111111] border border-[#333333] rounded-xl p-6 text-center shadow-2xl z-50">
            <p className="text-[#666666] text-sm">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}