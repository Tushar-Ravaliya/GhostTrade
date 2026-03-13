import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function LossStocks() {
  const [low, setLow] = useState([]);

  useEffect(() => {
    const getLowData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/market/lower');
        setLow(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getLowData();
  }, []);
  return (
    <div className=" bg-black text-white p-6 md:p-10 m-0 font-sans">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-medium tracking-wide text-gray-50">Loss Stocks</h1>
      </div>

      {/* Grid container */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {low?.length > 0 ? (
          low.map((lower) => (
            <Link to="/StockDatails" className="hover:text-red-600 transition-colors">
              <div
                key={lower.symbolToken}
                className="border-2 hover:border-red-600 hover:bg-red-500/20 border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200"
              >
                {/* Top: Logo and Company Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#ff0000] flex items-center justify-center text-white text-2xl font-medium shrink-0">
                    K
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-lg text-gray-100 tracking-wide truncate">
                      {lower.tradingSymbol.replace("28APR26FUT", "")}
                    </span>
                    <span className="text-xs text-[#666666] truncate mt-0.5">Name</span>
                  </div>
                </div>

                {/* Bottom: Price and Change */}
                <div className="flex gap-1">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-medium tracking-wider text-gray-200">
                        {lower.ltp}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">INR</span>
                    </div>
                    <span className="text-sm text-[#ff0000] tracking-wide">
                      {lower.percentChange}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1>No Low data</h1>
        )}
      </div>
    </div>
  );
}
