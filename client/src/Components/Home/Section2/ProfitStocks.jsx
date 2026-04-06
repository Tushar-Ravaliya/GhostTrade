import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfitStocks({ data = [], loading, error }) {
  const [logos, setLogos] = useState({});

  useEffect(() => {
    data.forEach(async (stock) => {
      if (logos[stock.symbol]) return;
      try {
        const { data: logoData } = await axios.get(
          `http://localhost:8000/api/v1/market/logo/${stock.symbol}`
        );
        if (logoData.url) {
          setLogos((prev) => ({ ...prev, [stock.symbol]: logoData.url }));
        }
      } catch {
        // Logo not available
      }
    });
  }, [data]);

  return (
    <div className="bg-black text-white p-6 md:p-10 m-0 font-sans">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-medium tracking-wide text-gray-50">
          Profit Stocks
        </h1>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          <p className="text-gray-400">Loading market data...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : data.length > 0 ? (
          data.map((stock) => {
            const logoUrl = logos[stock.symbol];
            return (
              <Link
                to={`/stock/${stock.symbol}`}
                className="hover:text-green-500 transition-colors"
                key={stock.symbol}
              >
                <div className="border-2 hover:border-green hover:bg-green/20 border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200">
                  {/* Top: Logo and Company Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-full ${logoUrl ? 'bg-white p-1.5' : 'bg-[#009900]/20'} flex items-center justify-center shrink-0 overflow-hidden`}>
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={stock.symbol}
                          className="w-full h-full object-contain rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.textContent = stock.symbol.charAt(0);
                          }}
                        />
                      ) : (
                        <span className="text-[#009900] text-2xl font-medium">
                          {stock.symbol.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-lg text-gray-100 tracking-wide truncate">
                        {stock.symbol}
                      </span>
                      <span className="text-xs text-[#666666] truncate mt-0.5">
                        {stock.name}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Price and Change */}
                  <div className="flex gap-1">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-medium tracking-wider text-gray-200">
                          {Number(stock.close).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">USD</span>
                      </div>
                      <span className="text-sm text-[#00ff00] tracking-wide">
                        +{Number(stock.percent_change).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h1>No Profit data</h1>
        )}
      </div>
    </div>
  );
}
