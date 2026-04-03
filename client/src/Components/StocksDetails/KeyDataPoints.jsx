import React from "react";

const KeyDataPoints = ({ stockData, loading }) => {
  const data = [
    { label: "Volume", value: stockData?.volume ? Number(stockData.volume).toLocaleString() : "---", unit: "" },
    { label: "Previous Close", value: stockData?.previous_close || "---", unit: "USD" },
    { label: "Open", value: stockData?.open || "---", unit: "USD" },
    { label: "Day's Range", value: stockData?.low && stockData?.high ? `${stockData.low} — ${stockData.high}` : "---", unit: "USD" },
    { label: "52 Week High", value: stockData?.fifty_two_week?.high || "---", unit: "USD" },
    { label: "52 Week Low", value: stockData?.fifty_two_week?.low || "---", unit: "USD" },
  ];

  return (
    <div className="w-full bg-black text-white p-6 md:p-10">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10 ml-15">Key data points</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center lg:items-center text-center lg:text-left"
          >
            {/* Label */}
            <span className="text-lg md:text-xl font-bold mb-3">
              {item.label}
            </span>

            {/* Value and Unit */}
            <div className="flex items-baseline space-x-1">
              {loading ? (
                <span className="inline-block w-20 h-5 bg-gray-700 rounded animate-pulse" />
              ) : (
                <>
                  <span className="text-gray-300 text-sm md:text-base font-medium">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-[10px] md:text-[11px] text-gray-500 uppercase font-bold tracking-tight">
                      {item.unit}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyDataPoints;
