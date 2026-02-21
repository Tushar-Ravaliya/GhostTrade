import React from "react";

const Features = () => {
  return (
    <div className="bg-black font-sans flex flex-col items-start">
      <div className="flex items-center justify-center w-28 h-28 mb-3 bg-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-12 h-12 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
        </svg>
      </div>

      <h3 className="mb-2 text-2xl font-medium tracking-wide text-white">
        Secure Trades
      </h3>

      <p className="text-lg text-gray-400">End-to-end protection</p>
    </div>
  );
};

export default Features;
