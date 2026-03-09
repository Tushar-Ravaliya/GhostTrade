import React, { useState } from "react";

const BuySell = () => {
  const [tradeType, setTradeType] = useState("buy");

  return (
    <div className="px-20 py-8">
      <div className="w-full max-w-full mx-auto bg-black p-4 md:p-6 rounded-xl border-2 border-white/40 shadow-2xl">
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTradeType("buy")}
            className={`flex-1 py-2 rounded-md font-bold text-lg transition-all ${
              tradeType === "buy"
                ? "bg-white text-green-700"
                : "bg-gray-900 text-gray-500"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType("sell")}
            className={`flex-1 py-2 rounded-md font-bold text-lg transition-all ${
              tradeType === "sell"
                ? "bg-white text-red-600"
                : "bg-gray-900 text-gray-500"
            }`}
          >
            Sell
          </button>
        </div>

        {/* Market Price Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Market Price
          </h3>
          <span className="text-white text-xl md:text-2xl font-bold">
            ₹4250
          </span>
        </div>

        {/* Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-bold text-sm uppercase">
              Quantity
            </label>
            <input
              type="number"
              defaultValue="1"
              className="bg-black border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-bold text-sm uppercase">
              Your Offer
            </label>
            <input
              type="number"
              defaultValue="4250"
              className="bg-black border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-8" />

        {/* Financial Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex justify-between items-center px-2">
            <span className="text-white text-lg font-bold">
              Estimated Total
            </span>
            <span className="text-white text-lg font-bold">₹4250</span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-white text-lg font-bold">Balance</span>
            <span className="text-white text-lg font-bold">₹99,905</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-white text-green-700 py-3 rounded-md font-extrabold text-xl hover:bg-gray-100 transition-colors">
          Place {tradeType === "buy" ? "Buy" : "Sell"} Order
        </button>
      </div>
    </div>
  );
};

export default BuySell;
