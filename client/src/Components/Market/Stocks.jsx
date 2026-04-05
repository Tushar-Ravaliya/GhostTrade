import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketMovers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/market/market-movers"
        );

        // Combine gainers and losers into one array
        const allStocks = [...(data.gainers || []), ...(data.losers || [])];
        setStocks(allStocks);
      } catch (err) {
        console.error("Failed to fetch market movers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketMovers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-[#222222] rounded-xl p-5 bg-black animate-pulse"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#222222]"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 bg-[#222222] rounded w-20"></div>
                  <div className="h-3 bg-[#1a1a1a] rounded w-32"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-[#222222] rounded w-16"></div>
                <div className="h-3 bg-[#1a1a1a] rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="p-6 md:p-10 text-center">
        <p className="text-[#666666] text-lg">No market data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 md:p-10 m-0">
        <h2 className="text-white text-2xl font-bold mb-6 tracking-wide">
          Market Movers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stocks.map((stock, index) => {
            const change = parseFloat(stock.percent_change) || 0;
            const isPositive = change > 0;

            return (
              <div
                key={`${stock.symbol}-${index}`}
                onClick={() => navigate(`/stock/${stock.symbol}`)}
                className={`border-2 cursor-pointer ${
                  isPositive
                    ? "hover:bg-green/20 hover:border-green"
                    : "hover:bg-red-500/20 hover:border-red-500"
                } border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200`}
              >
                {/* Top: Logo and Company Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      isPositive ? "bg-[#009900]/20" : "bg-red-500/20"
                    } flex items-center justify-center ${
                      isPositive ? "text-[#009900]" : "text-red-500"
                    } text-2xl font-medium shrink-0`}
                  >
                    {stock.symbol?.charAt(0)}
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
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-medium tracking-wider text-gray-200">
                      {parseFloat(stock.close).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {stock.currency || "USD"}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      isPositive ? "text-green" : "text-red-500"
                    } tracking-wide`}
                  >
                    {isPositive ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stocks;
