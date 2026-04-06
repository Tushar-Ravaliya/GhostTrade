import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = ({ symbol, stockData, loading }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  const name = stockData?.name || symbol || '---';
  const price = stockData?.close || '---';
  const percentChange = parseFloat(stockData?.percent_change || 0);
  const isPositive = percentChange >= 0;

  useEffect(() => {
    const fetchLogo = async () => {
      if (!symbol) return;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/market/logo/${symbol}`
        );
        if (data.url) {
          setLogoUrl(data.url);
        }
      } catch {
        // Logo not available
      }
    };
    fetchLogo();
  }, [symbol]);

  return (
    <div className="w-full bg-black flex items-center p-4 md:p-15 md:px-25 min-h-30">
      <div className="flex items-center space-x-4 md:space-x-6">

        {/* Logo Circle */}
        <div className={`shrink-0 w-16 h-16 md:w-20 md:h-20 ${logoUrl ? 'bg-white p-2' : isPositive ? 'bg-green-600' : 'bg-[#FF0000]'} rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 overflow-hidden`}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={symbol}
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.textContent = symbol ? symbol.charAt(0) : '?';
              }}
            />
          ) : (
            <span className="text-white text-4xl md:text-5xl font-black">
              {symbol ? symbol.charAt(0) : '?'}
            </span>
          )}
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center leading-tight">
          {/* Title */}
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wider uppercase">
            {loading ? (
              <span className="inline-block w-40 h-6 bg-gray-700 rounded animate-pulse" />
            ) : (
              name
            )}
          </h1>

          {/* Price and Change Container */}
          <div className="flex items-baseline space-x-2 mt-1">
            {loading ? (
              <span className="inline-block w-28 h-7 bg-gray-700 rounded animate-pulse" />
            ) : (
              <>
                <span className="text-white text-2xl md:text-3xl font-semibold">
                  {Number(price).toFixed(2)}
                </span>

                <span className="text-[10px] md:text-xs text-gray-400 uppercase font-medium">
                  USD
                </span>

                <span className={`text-sm md:text-[15px] font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;