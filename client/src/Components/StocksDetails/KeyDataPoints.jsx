import React from "react";

const KeyDataPoints = () => {
  const data = [
    { label: "Volume", value: "1.35", unit: "B" },
    { label: "Previous close", value: "6,978.59", unit: "USD" },
    { label: "Open", value: "7,002.00", unit: "USD" },
    { label: "Day's range", value: "6,968.23 — 7,002.28", unit: "USD" },
  ];

  return (
    <div className="w-full bg-black text-white p-6 md:p-10">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10 ml-15">Key data points</h2>

      {/* Responsive Grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
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
              <span className="text-gray-300 text-sm md:text-base font-medium">
                {item.value}
              </span>
              <span className="text-[10px] md:text-[11px] text-gray-500 uppercase font-bold tracking-tight">
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyDataPoints;
