import React from "react";

const Stocks = () => {
  const stocksData = [
    {
      id: 1,
      initial: "K",
      symbol: "KALYANKJIL",
      name: "Kalyan Jewellers India Ltd.",
      price: "396.55",
      currency: "INR",
      change: 12.16,
    },
    {
      id: 2,
      initial: "I",
      symbol: "IDEA",
      name: "Vodafone Idea Ltd.",
      price: "13.20",
      currency: "INR",
      change: -1.45,
    },
    {
      id: 3,
      initial: "A",
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd.",
      price: "1125.30",
      currency: "INR",
      change: +2.10,
    },
    {
      id: 4,
      initial: "S",
      symbol: "SUZLON",
      name: "Suzlon Energy Ltd.",
      price: "45.80",
      currency: "INR",
      change: -4.25,
    },
    {
      id: 5,
      initial: "P",
      symbol: "PNB",
      name: "Punjab National Bank",
      price: "128.40",
      currency: "INR",
      change: +0.85,
    },
    {
      id: 6,
      initial: "I",
      symbol: "INFY",
      name: "Infosys Limited",
      price: "1450.90",
      currency: "INR",
      change: -1.12,
    },
    {
      id: 7,
      initial: "H",
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      price: "1620.15",
      currency: "INR",
      change: +1.50,
    },
    {
      id: 8,
      initial: "E",
      symbol: "EVERESTORG",
      name: "Everest Organics Ltd.",
      price: "185.60",
      currency: "INR",
      change: -0.40,
    },
    {
      id: 9,
      initial: "R",
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: "2980.00",
      currency: "INR",
      change: +3.45,
    },
    {
      id: 10,
      initial: "T",
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: "3890.50",
      currency: "INR",
      change: -0.75,
    },
    {
      id: 11,
      initial: "S",
      symbol: "SBIN",
      name: "State Bank of India",
      price: "765.25",
      currency: "INR",
      change: +1.80,
    },
    {
      id: 12,
      initial: "I",
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd.",
      price: "1080.70",
      currency: "INR",
      change: +0.95,
    },
    {
      id: 13,
      initial: "T",
      symbol: "TATAMOTORS",
      name: "Tata Motors Ltd.",
      price: "985.40",
      currency: "INR",
      change: -2.15,
    },
    {
      id: 14,
      initial: "Z",
      symbol: "ZOMATO",
      name: "Zomato Ltd.",
      price: "165.30",
      currency: "INR",
      change: +5.60,
    },
    {
      id: 15,
      initial: "I",
      symbol: "ITC",
      name: "ITC Limited",
      price: "420.80",
      currency: "INR",
      change: -0.25,
    },
    {
      id: 16,
      initial: "W",
      symbol: "WIPRO",
      name: "Wipro Ltd.",
      price: "480.10",
      currency: "INR",
      change: -1.50,
    },
    {
      id: 17,
      initial: "A",
      symbol: "ADANIPOWER",
      name: "Adani Power Ltd.",
      price: "540.25",
      currency: "INR",
      change: +4.20,
    },
    {
      id: 18,
      initial: "M",
      symbol: "MRF",
      name: "MRF Ltd.",
      price: "145000.00",
      currency: "INR",
      change: -0.10,
    },
  ];

  return (
    <>
      <div className="p-6 md:p-10 m-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stocksData.map((stock) => (
            <div
              key={stock.id}
              className={`border-2 ${stock.change > 0 ? "hover:bg-green/20 hover:border-green " : `hover:bg-red-500/20 hover:border-red-500`} border-[#222222] rounded-xl p-5 flex flex-col justify-between bg-black transition-colors duration-200`}
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
                <span
                  className={`text-sm ${stock.change > 0 ? "text-green" : `text-red-500`} tracking-wide`}
                >
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stocks;
