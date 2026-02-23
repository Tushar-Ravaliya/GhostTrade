import React from 'react';

const stocksData = [
  { id: 1, initial: 'K', symbol: 'KALYANJIT', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 2, initial: 'I', symbol: 'IDEA', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 3, initial: 'A', symbol: 'Airtel', name: 'Airtel', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 4, initial: 'K', symbol: 'Suzlon', name: 'Suzlon energy Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 5, initial: 'P', symbol: 'PNB', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 6, initial: 'I', symbol: 'Infosys Limited', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 7, initial: 'H', symbol: 'HDFC BANK', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
  { id: 8, initial: 'E', symbol: 'Everest Organics', name: 'Kalyan Jewelers India Ltd.', price: '396.55', currency: 'INR', change: '-1.42 %' },
];

export default function LossStocks() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-medium tracking-wide text-gray-50">
          Profit Stocks
        </h1>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stocksData.map((stock) => (
          <div 
            key={stock.id} 
            className="border-2 hover:border-red-500 hover:bg-red-500/20 border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200"
          >
            {/* Top: Logo and Company Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#ff0000] flex items-center justify-center text-white text-2xl font-medium shrink-0">
                {stock.initial}
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
                  {stock.price}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {stock.currency}
                </span>
              </div>
              <span className="text-sm text-red-500 tracking-wide">
                {stock.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}