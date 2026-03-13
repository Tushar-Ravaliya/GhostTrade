import React from "react";
import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ProfitStocks() {

  const [profit, setProfit] = useState([]);

  useEffect(() => {
    // Move it inside to satisfy the linter
    const getProfitData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/market/gainer");
        // Add a fallback || [] so it never becomes undefined
        console.log(response.data);
        console.log(response.data.data);

        setProfit(response.data.data);
        console.log(profit);

      } catch (err) {
        console.error(err);
      }
    };
    console.log(profit);

    getProfitData();
  }, []);
  return (
    <div className=" bg-black text-white p-6 md:p-10 m-0 font-sans">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-medium tracking-wide text-gray-50">
          Profit Stocks
        </h1>
      </div>

      {/* Grid container */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {
          profit?.length > 0 ? (profit.map((pro) => (
            <Link
              to="/StockDatails"
              className="hover:text-green-500 transition-colors"
            >
              <div
                key={pro.symbolToken}
                className="border-2 hover:border-green hover:bg-green/20 border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200"
              >
                {/* Top: Logo and Company Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#ff0000] flex items-center justify-center text-white text-2xl font-medium shrink-0">
                    {pro.tradingSymbol.charAt(0)}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-lg text-gray-100 tracking-wide truncate">
                      {pro.tradingSymbol.replace("30MAR26FUT", "")}
                    </span>
                    <span className="text-xs text-[#666666] truncate mt-0.5">
                      Name
                    </span>
                  </div>
                </div>

                {/* Bottom: Price and Change */}
                <div className="flex gap-1">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-medium tracking-wider text-gray-200">
                        {pro.ltp}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        INR
                      </span>
                    </div>
                    <span className="text-sm text-[#00ff00] tracking-wide">
                      +{pro.percentChange}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))) :
            <h1>No Profit data</h1>
        }
      </div>


    </div>
  );
}
