import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search as SearchIcon } from "lucide-react";

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
          if (logos[item.symbol]) return;
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
    <div className="w-full bg-gradient-to-br from-surface-secondary via-white to-primary-50 flex flex-col items-center justify-center px-4 py-16 md:py-20">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Explore <span className="text-primary">Markets</span>
        </h1>
        <p className="text-text-muted text-sm md:text-base">
          Search stocks, ETFs, and more to start trading
        </p>
      </div>

      {/* Search Input Container */}
      <div className="relative w-full max-w-xl" ref={dropdownRef}>
        <div className="flex items-center w-full bg-white rounded-xl px-4 py-3.5 shadow-lg shadow-black/5 border border-border focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all">
          <SearchIcon size={20} className="text-text-muted mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search stocks, ETFs, crypto..."
            className="w-full bg-transparent outline-none text-text-primary text-base placeholder-text-muted font-medium"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
          />
          {loading && (
            <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin shrink-0 ml-2"></div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl overflow-hidden shadow-xl z-50 max-h-96 overflow-y-auto animate-slide-down">
            {results.map((item, index) => {
              const logoUrl = logos[item.symbol];
              return (
                <div
                  key={`${item.symbol}-${item.exchange}-${index}`}
                  className="flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-surface-secondary transition-colors border-b border-border-light last:border-b-0"
                  onClick={() => handleSelect(item.symbol)}
                >
                  {/* Symbol Logo or Initial */}
                  <div className={`w-10 h-10 rounded-full ${logoUrl ? 'bg-white border border-border p-1' : 'bg-primary-50'} flex items-center justify-center shrink-0 overflow-hidden`}>
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={item.symbol}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<span class="text-primary font-bold text-lg">${item.symbol?.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-primary text-lg font-bold">
                        {item.symbol?.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-text-primary font-semibold text-sm truncate">
                      {item.symbol}
                    </span>
                    <span className="text-text-muted text-xs truncate">
                      {item.instrument_name}
                    </span>
                  </div>

                  {/* Exchange & Type Badge */}
                  <div className="flex flex-col items-end shrink-0 gap-1">
                    <span className="text-text-muted text-xs font-medium">
                      {item.exchange}
                    </span>
                    <span className="text-[10px] text-primary bg-primary-50 px-2 py-0.5 rounded-full uppercase font-semibold">
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl p-6 text-center shadow-xl z-50 animate-slide-down">
            <p className="text-text-muted text-sm">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}