import React, { useState, useMemo } from "react";

const BuySell = ({ symbol, stockData }) => {
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState(1);

  const marketPrice = stockData?.close ? parseFloat(stockData.close) : 0;
  const estimatedTotal = useMemo(() => (quantity * marketPrice).toFixed(2), [quantity, marketPrice]);

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
            ${marketPrice.toLocaleString()}
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
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-black border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-bold text-sm uppercase">
              Your Offer
            </label>
            <input
              type="number"
              defaultValue={marketPrice}
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
            <span className="text-white text-lg font-bold">${estimatedTotal}</span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-white text-lg font-bold">Symbol</span>
            <span className="text-white text-lg font-bold">{symbol}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full py-3 rounded-md font-extrabold text-xl transition-colors ${
          tradeType === "buy"
            ? "bg-white text-green-700 hover:bg-gray-100"
            : "bg-white text-red-600 hover:bg-gray-100"
        }`}>
          Place {tradeType === "buy" ? "Buy" : "Sell"} Order — {symbol}
        </button>
      </div>
    </div>
  );
};

export default BuySell;
